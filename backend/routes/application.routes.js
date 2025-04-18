import express from 'express';
import { applyJob, updateApplicationStatus, getAppliedJobs, getApplicants } from '../logic/application.controller.js';
import isAuthenticated from "../middlewares/isAuthenticate.js"; // Middleware to authenticate users

// Create a router instance
const router = express.Router();



// Route to get all applications by a specific user (Job Seekers)
router.get('/user', isAuthenticated, getAppliedJobs);  // Get applications by the logged-in user

// Route to get all applications for a specific job (Employers/Admins)
router.get('/job/:id', isAuthenticated, getApplicants);  // Get applicants for a specific job

// Route to update the application status (Employers/Admins)
router.post('/:id/status', isAuthenticated, updateApplicationStatus);  // Update status of a specific application


// Route to apply for a job (Job Seekers)
router.get('/:id', isAuthenticated, applyJob);  // Apply for a job using job ID
//router.get('/:id', applyJob);

export default router;
