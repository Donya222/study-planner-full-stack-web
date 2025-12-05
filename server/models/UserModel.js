import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    uname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // صورة البروفايل (اختياري)
    profilepic: { type: String, default: "" },

    // الموقع – نستخدمه في صفحة البروفايل
    location: { type: String, default: "Oman" }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("Users", UserSchema, "Users");
export default UserModel;
