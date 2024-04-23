import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UsersModel from "./models/Users.js";
import NotesModel from "./models/Notes.js";
import ValidTokenModel from "./models/Tokens.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import validator from "email-validator";
import 'dotenv/config';
import crypto from "crypto";
import sendMail from "./Mailer.js";
import jwt from "jsonwebtoken";
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE).then(console.log("Connected to MongoDB Database!"));

async function authenticateToken (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if(token === null) return res.status(401).json({message: "Need a valid token for verification."})
  
  jwt.verify(token, process.env.ACCESS_KEY, (error) => {
    if(error) return res.status(403);
  })

  const validateToken = await ValidTokenModel.findOne({ token })
  if(!validateToken) return res.status(403).json({message: "Token Expired."});

  next();
};



app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, password, reenterPassword, email } = req.body;

    if (!firstName || !lastName || !password || !reenterPassword || !email)  return res.status(400).json({message: "Enter values for all fields."});

    if(!validator.validate(email)) return res.status(400).json({message: "Enter a valid email."});
    
    if(password !== reenterPassword) return res.status(400).json({message: "Passwords don't match."});

    if (!(password.length >= 8 && password.length <= 12)) return res.status(400).json({message: "Password must be between 8 and 12 characters."});

    const existingUser = await UsersModel.findOne({ email: email });
    if(existingUser) return res.status(409).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    await UsersModel.create({
      ...req.body,
      password: hashedPassword
    });

    return res.status(200).json({message: "User registered successfully."});
  } 
  
  catch (error) {
    console.error(error)
    res.status(500).json({ message: "An unexpected error occurred. Please try again later."});
  }
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.findOne({ email: email });

    if (!email || !password) return res.status(400).json({message: "Enter values for all fields."});

    if(!validator.validate(email)) return res.status(400).json({message: "Enter a valid email."});

    if (!(password.length >= 8 && password.length <= 12)) return res.status(400).json({message: "Password must be between 8 and 12 characters."});

    if(!user) return res.status(401).json({ message: "Invalid login credentials." });
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "The password you entered is incorrect." });
    
    const currentUser = { userId: user._id }
    const accessToken = jwt.sign(currentUser, process.env.ACCESS_KEY, {expiresIn: "10m"})

    const validToken = new ValidTokenModel({
      token: accessToken
    });
    await validToken.save()

    return res.status(200).json({ message: "Success", accessToken: accessToken });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({message: "An unexpected error occurred. Please try again later.",});
  }
});



app.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const removeToken = await ValidTokenModel.deleteOne({ token: token });
    if(removeToken.deletedCount === 1) return res.status(200).json({ message: 'Success' });

    else return res.status(500).json({ message: 'Logout Failed.' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed.' });
  }
});



app.post("/forgotPassword", async(req, res) => {
  const email = req.body.email;
  try {

    if(!validator.validate(email)) return res.status(400).json({message: "Enter a valid email."});

    const existingUser = await UsersModel.findOne({ email: email });
    if(!existingUser) return res.status(401).json({ message: "Email not found." });
    

    const verificationCode = crypto.randomInt(
      100000, 999999
    ).toString()
    
    sendMail(verificationCode, email);
    return res.status(200).json({ message: "Success", code: verificationCode});
  }

  catch(error) {
    console.error("Error forget password: ", error)
    return res
      .status(500)
      .json({
        message: "An unexpected error occurred. Please try again later.",
      });
  }
})



app.post("/resetPassword", async(req, res) => {
  const {email, password, reenterPassword} = req.body
  try {
    const existingUser = await UsersModel.findOne({ email: email });
    if(!existingUser) return res.status(401).json({ message: "Email not found." });
    
    if(password !== reenterPassword) return res.status(400).json({ message: "Passwords don't match." });
    
    if (!(password.length >= 8 && password.length <= 12)) return res.status(400).json({message: "Password must be between 8 and 12 characters."});

    const hashedPassword = await bcrypt.hash(password, 10);
    await UsersModel.updateOne({email: email}, {password: hashedPassword})
    return res.status(200).json({message: "Success"});
  }

  catch(error) {
    console.error("Error resetting passowrd: ", error)
    res.status(500).json({message: "An unexpected error occurred. Please try again later."});
  }
})



app.post("/getUser", authenticateToken, async (req, res) => {
  try {
    const userId = req.body.userId;
    if(userId === "") return res.status(401).json({message: "User id required to get the notes."});

    const user = await UsersModel.findOne({ _id: userId });
    return res.status(200).json({ message: "Success", user});

  }

  catch(error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({
        message: "An unexpected error occurred. Please try again later.",
      });
  }

})



app.put("/updateProfile", authenticateToken, async(req, res) => {
  try {
    const {firstName, lastName, email, userId} = req.body

    if(userId === "") return res.status(401).json({message: "User id required to update the notes."});
    
    if(firstName === "" || lastName === "" || email === "") return res.status(400).json({message: "Enter value for all input fields."});
    
    await UsersModel.updateOne(
      {_id: userId},
      {
        firstName,
        lastName,
        email
      }
    )
    return res.status(200).json({ message: "Success" });
  }

  catch(error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
})



app.put("/changePassword", authenticateToken, async(req, res) => {
  
  try {
    const {currentPassword, newPassword, reenterNewPassword, userId } = req.body

    if(userId === "") return res.status(401).json({message: "User id required to change the password."});
    
    if(currentPassword === "" || newPassword === "" || reenterNewPassword=== "") return res.status(400).json({message: "Enter value for all input fields."});

    if(newPassword !== reenterNewPassword) return res.status(400).json({message: "New password don't match."});
    
    if (!(newPassword.length >= 8 && newPassword.length <= 12)) return res.status(400).json({message: "Password must be between 8 and 12 characters."});
    
    const existingUser = await UsersModel.findOne({_id: userId});
    if(!existingUser) return res.status(401).json({ message: "User not found." });
    
    const validCurrentPassword = await bcrypt.compare(currentPassword, existingUser.password);
    if(!validCurrentPassword) return res.status(401).json({ message: "Enter valid current password." });
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await UsersModel.updateOne({_id: userId}, {
      password: hashedNewPassword
    });

    return res.status(200).json({ message: "Success" });
  }

  catch(error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
})




app.post("/addnote", authenticateToken, async (req, res) => {
  const userId = req.body.userId;
  try {
    if(userId === "") return res.status(401).json({message: "User id required to get the notes."});
    
    const newNote = await NotesModel.create({
      userId: userId, // Assign the userId from session
      notes: req.body, 
    });

    return res.status(201).json(newNote);
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
});




app.post("/getnotes", authenticateToken, async(req, res) => {
  try {
    const userId = req.body.userId;
    if(userId === "") return res.status(401).json({message: "User id required to get the notes."});

    const notes = await NotesModel.find({ userId: userId });
    return res.status(200).json({ message: "Success", notes: notes});
  }

  catch (error) {
    console.error("Error getting all notes:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
});



app.post("/getCurrentNote", authenticateToken, async(req, res) => {
  
  try {
    const { noteId, userId } = req.body

    if(noteId === "") return res.status(401).json({message: "Note id required to get the note."});
    
    if(userId === "") return res.status(401).json({message: "User id required to get the notes."});
    
    const notes = await NotesModel.findOne({ _id: noteId, userId: userId });
    return res.status(200).json({ message: "Success", notes: notes});
  }

  catch (error) {
    console.error("Error getting current note:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
});



app.post("/deleteNote", authenticateToken, async(req, res) => {
  const { noteId, userId } = req.body

  try {
    if(noteId === "") return res.status(401).json({message: "Note id required to delete the note."});
    
    if(userId === "") return res.status(401).json({message: "User id required to delete the notes."});
    
    await NotesModel.deleteOne({ _id: noteId, userId: userId });
    return res.status(200).json({ message: "Successfully deleted note."});
  }

  catch(error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
})



app.put("/updateNote",  authenticateToken, async(req, res) => {
  const {title, description, addedDate, dueDate, noteId, userId} = req.body

  try {
    if(noteId === "") return res.status(401).json({message: "Note id required to update the note."});
    
    if(userId === "") return res.status(401).json({message: "User id required to update the notes."});
    
    if(title === "" || description === "" || addedDate === "" || dueDate === "" || noteId === "") return res.status(400).json({message: "Enter value for all input fields."});

    await NotesModel.updateOne(
      {_id: noteId},
      {notes:{
        addedDate,
        title,
        description,
        dueDate
      }}
    )
    return res.status(200).json({ message: "Success" });
  }

  catch(error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
})

app.post("/searchNote", authenticateToken, async (req, res) => {
  const { title, sortBy, userId } = req.body

  try {  
    if(userId === "") return res.status(401).json({message: "User id required to get the notes."});

    let query = { userId: userId };
    let sortField;

    if (title) {
      query["notes.title"] = { $regex: title, $options: "i" };
    }

    if (sortBy === "addedDate" || sortBy === "dueDate") {
      sortField = `notes.${sortBy}`;
    }

    let notes;

    if (sortField) {
      if (title) notes = await NotesModel.find(query).sort({ [sortField]: 1 });
      else notes = await NotesModel.find({ userId: userId }).sort({ [sortField]: 1 });     
    } else {
      notes = await NotesModel.find(query);
    }

    return res.status(200).json({ message: "Success", notes: notes });
  } catch (error) {
    console.error("Error searching note:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000!"));