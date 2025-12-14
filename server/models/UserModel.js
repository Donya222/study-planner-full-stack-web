import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    uname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Profile Picture
    profilepic: { type: String, default: "" },

    // Country Name
    location: { type: String, default: "Oman" },

  
    lat: { type: Number, default: null },
    lng: { type: Number, default: null }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("Users", UserSchema, "Users");
export default UserModel;
