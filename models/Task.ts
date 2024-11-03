import mongoose from "mongoose";

const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type: String,
        required:true,
        default:"Pendiente",
        enum : ['Pendiente','En Progreso','Completa'],
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User",
    },
    dueDate:{
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model("Task",TaskSchema)