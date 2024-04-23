import mongoose from "mongoose";

const validTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  }
});

const ValidTokenModel = mongoose.model("validtokens", validTokenSchema);

export default ValidTokenModel;
