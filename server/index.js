import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';
import bcrypt from 'bcrypt';
import TaskModel from './models/Tasks.js';

const app = express();
app.use(cors());
app.use(express.json());

// DB CONNECTION
try {
    const conStr = "mongodb+srv://donya:1234@cluster0.onlzt7y.mongodb.net/trytosee?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(conStr);
    console.log("Database Connected..");
} catch (error) {
    console.log("Database connection error: " + error);
}

// START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000..");
});


// LOGIN
app.post("/login", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user)
            return res.status(500).json({ message: "User not found..." });

        const pwd_match = await bcrypt.compare(req.body.password, user.password);

        if (pwd_match)
            res.status(200).json({ user: user, message: "Success" });
        else
            res.status(200).json({ message: "Invalid Credentials.." });

    } catch (error) {
        res.send(error);
    }
});


// REGISTER
app.post("/register", async (req, res) => {
    try {
        const { uname, email, password, profilepic } = req.body;

        const hash_password = await bcrypt.hash(password, 10);
        const user = await UserModel.findOne({ email });

        if (user)
            return res.status(500).json({ message: "User already exists..." });

        const new_user = new UserModel({
            uname,
            email,
            password: hash_password,
            profilepic
        });

        await new_user.save();
        res.status(200).json({ message: "Success" });

    } catch (error) {
        res.send(error);
    }
});


// PROFILE ROUTES

// GET PROFILE
app.get("/profile/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select("-password");

        if (!user)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
});

// UPDATE PROFILE
app.put("/profile/:id", async (req, res) => {
    try {
        const { uname, email, profilepic, location, lat, lng } = req.body;

        const updateData = {};

        if (uname) updateData.uname = uname;
        if (email) updateData.email = email;
        if (profilepic) updateData.profilepic = profilepic;
        if (location) updateData.location = location;
        if (lat !== undefined) updateData.lat = lat;
        if (lng !== undefined) updateData.lng = lng;

        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedUser)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "Profile updated",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating profile" });
    }
});


// DELETE ACCOUNT
app.delete("/profile/:id", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });

        await TaskModel.deleteMany({ email: user.email });
        await UserModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Account and tasks deleted" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting account" });
    }
});


// ADD TASK 
app.post("/tasks", async (req, res) => {
    try {
        const { title, details, subject, type, dueDateTime, email, priority } = req.body;

        const newTask = new TaskModel({
            title,
            details,
            subject,
            type,
            dueDateTime,
            email,
            priority: priority || "Medium", 
            done: false,
            completedAt: null
        });

        await newTask.save();

        res.status(200).json({
            message: "Task added successfully",
            task: newTask
        });

    } catch (error) {
        res.status(500).json({ message: "Error adding task" });
    }
});


// VIEW TASKS
app.get("/tasks", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email)
            return res.status(400).json({ message: "Email is required" });

        const tasks = await TaskModel.find({ email }).sort({ dueDateTime: 1 });
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});


// GET SINGLE TASK
app.get("/tasks/:id", async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);

        if (!task)
            return res.status(404).json({ message: "Task not found" });

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: "Error fetching task" });
    }
});


// UPDATE TASK 
app.put("/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            req.params.id,
            req.body, // contains priority, no need for manual mapping
            { new: true }
        );

        if (!updatedTask)
            return res.status(404).json({ message: "Task not found" });

        res.status(200).json({
            message: "Task updated",
            task: updatedTask
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
});


// UPDATE DONE
app.put("/tasks/done/:id", async (req, res) => {
    try {
        const task = await TaskModel.findById(req.params.id);

        if (!task)
            return res.status(404).json({ message: "Task not found" });

        task.done = !task.done;

        task.completedAt = task.done ? new Date() : null;

        await task.save();

        res.status(200).json({
            message: "Done status updated",
            task
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating done state" });
    }
});


// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {
    try {
        await TaskModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
});
