import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
  title: { type: String, required: true }, 
  details: { type: String, required: true }, 
  subject: { type: String, required: true }, 
  type: { type: String, default: "" }, 
  dueDateTime: { type: Date, required: true }, 
}, {
  timestamps: { createdAt: true, updatedAt: true }
});

const TaskModel = mongoose.model("Tasks", TaskSchema, "Tasks");
export default TaskModel;
