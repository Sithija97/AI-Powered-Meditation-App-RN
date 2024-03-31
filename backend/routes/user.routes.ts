import express from "express";
import {
  deleteUser,
  getAllRegisterdUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post("/auth", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, updateUserProfile);
userRouter.get("/all", protect, getAllRegisterdUsers);
userRouter.delete("/:id", protect, deleteUser);

export { userRouter };
