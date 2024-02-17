import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UsersModel from "./models/Users.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/Users");

app.post("/register", async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = await UsersModel.create({
      ...userData,
      password: hashedPassword,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await UsersModel.findOne({ email: email });

    if (user) {
      // Compare the hashed password using bcrypt
      const match = bcrypt.compare(password, user.password);

      if (match) {
        res.json("Success");
      } else {
        res.json("Password is incorrect!");
      }
    } else {
      res.json("No record existed.");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(3000, () => console.log("Server is running on port 3000!"));