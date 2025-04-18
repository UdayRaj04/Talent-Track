import express from "express";
import { postJob, getAllJobs, getJobById, getAdminJobs } from "../logic/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticate.js";

const router = express.Router();

// Public routes for students/job seekers
router.route("/jobs").get(getAllJobs);          // Get all jobs with optional search (keyword)
router.route("/job/:id").get(getJobById);       // Get a specific job by its ID

// Protected routes for employers/admin (requires authentication)
router.route("/job").post(isAuthenticated, postJob);  // Post a new job (only for authenticated users)

// Protected route for admin to get their posted jobs
router.route("/admin/jobs").get(isAuthenticated, getAdminJobs);  // Get all jobs posted by the admin

export default router;
