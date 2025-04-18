import express from "express";
import { login, logout, register, updateProfile, getUserById } from "../logic/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticate.js";
import { User } from "../models/user.model.js";


const router = express.Router();

// Public routes
//router.route("/register").post({msg:"testing"});
router.route("/register").post(register);    // Register a new user
router.route("/login").post(login);          // Login a user
router.route("/logout").get(logout);
router.route("/:id").get( async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      console.log("xdgfdgf"+user);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
// Protected route (requires authentication)
//router.route("/profile/update").post(isAuthenticated,  updateProfile);   // Update user profile (PUT is used for updates)
router.route("/profile/update").post(  updateProfile); 
export default router;
