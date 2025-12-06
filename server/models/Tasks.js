import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    details: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, default: "" },
    dueDateTime: { type: Date, required: true },
    email: { type: String, required: true },

    // ⭐ NEW FIELD — Priority (High / Medium / Low)
    priority: { type: String, default: "Medium" },

    // CHECKBOX + COMPLETION DATE
    done: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);

const TaskModel = mongoose.model("Tasks", TaskSchema, "Tasks");
export default TaskModel;
