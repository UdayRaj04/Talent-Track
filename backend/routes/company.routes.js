import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../logic/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticate.js";
// import { singleUpload } from "../middlewares/multer.js";
 // Ensure this is imported

const router = express.Router();

// Apply the middleware to protect these routes
router.post("/register", isAuthenticated, registerCompany);  // Only authenticated users can register companies
router.get("/get", isAuthenticated, getCompany);  // Get companies for logged-in user
router.get("/:id", isAuthenticated, getCompanyById);  // Get a specific company by ID
router.put("/update/:id", isAuthenticated, updateCompany);  // Update company details

export default router;
