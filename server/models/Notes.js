import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    addedDate: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    }
});

const NotesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdetails",
        required: true
    }, 
    
    notes: [NoteSchema],
    tasks: [{
        type: String,
        required: true
    }]
});

const NotesModel = mongoose.model("notes", NotesSchema);

export default NotesModel;