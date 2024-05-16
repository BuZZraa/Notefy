import mongoose from "mongoose";

const validTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdetails",
    required: true,
  }, 
  role: {
    type: String,
    ref: "userdetails",
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true,
  }
});

const ValidTokenModel = mongoose.model("validtokens", validTokenSchema);

export default ValidTokenModel;
