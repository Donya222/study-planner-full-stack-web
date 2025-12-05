import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';
import bcrypt from 'bcrypt';
import TaskModel from './models/Tasks.js';

const app=express();
app.use(cors());
app.use(express.json());

try{
    const conStr="mongodb+srv://donya:1234@cluster0.onlzt7y.mongodb.net/trytosee?retryWrites=true&w=majority&appName=Cluster0";
    mongoose.connect(conStr);
    console.log("Database Connected..")
}
catch(error){
    console.log("Database connection error.."+error);
}

app.listen(5000,()=>{
    console.log("Server connected at port number 5000..")
})

app.post("/login",async(req,res)=>{
    try{
        const user=await UserModel.findOne({email:req.body.email});
        if(user){
            const pwd_match=await bcrypt.compare(req.body.password,user.password);
            if(pwd_match)
                res.status(200).json({user:user,message:"Success"});
            else
                res.status(200).json({message:"Invalid Credentials.."});
        }
        else{
            
            res.status(500).json({message:"User not found..."});
        }
    }
    catch(error){
        res.send(error);
    }
});

app.post("/register",async(req,res)=>{
    try{
        const {uname,email,password,profilepic}=req.body;
        const hash_password=await bcrypt.hash(password,10);
        const user=await UserModel.findOne({email:email});
        if(!user){
            const new_user=new UserModel({
                uname:uname,
                email:email,
                password:hash_password,
                profilepic:profilepic
            });
            await new_user.save();
            res.status(200).json({message:"Success"});
        }
        else{
            res.status(500).json({message:"User already exists..."});
        }
    }
    catch(error){
        res.send(error);
    }
});
//add
app.post("/tasks", async (req, res) => {
    try {
        const { title, details, subject, type, dueDateTime, email } = req.body;
        
        const newTask = new TaskModel({
            title,
            details,
            subject,
            type,
            dueDateTime,
            email 
        });

        await newTask.save();
        res.status(200).json({ message: "Task added successfully", task: newTask });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Error adding task" });
    }
});

// view 
app.get("/tasks", async (req, res) => {
    try {
        const { email } = req.query; // Get email from URL ?email=...
        if (!email) return res.status(400).json({ message: "Email is required" });

        // Find tasks for this email and sort by Due Date
        const tasks = await TaskModel.find({ email: email }).sort({ dueDateTime: 1 });
        
        res.status(200).json({ tasks: tasks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const task = await TaskModel.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task details" });
    }
});

// UPDATE TASK
app.put("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(id, updatedData, { new: true });
        
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
});

// 5. DELETE TASK
app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
});