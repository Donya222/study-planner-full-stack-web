import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './features/UserSlice';
import tasksReducer from './features/TaskSlice';

export const store=configureStore({
    reducer:{
        users:UserReducer,tasks:tasksReducer
    }
});