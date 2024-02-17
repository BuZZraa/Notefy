import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

const UsersModel = mongoose.model("userdetails", UsersSchema);

export default UsersModel;