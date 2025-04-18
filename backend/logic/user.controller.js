import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// Register User


export const getUserById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await User.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const register = async (req, res) => {
    try {
        console.log("Registering");
        const { fullname, email, phonenumber, password, role } = req.body;
        console.log(req.body);
        
        //Input validation
        if (!fullname || !email || !phonenumber || !password || !role) {
            console.log("doing");
            return res.status(200).json({
                message: 'Input Missing',
                success: false
            });
        }

        //const file = req.file;
        //const fileUri = getDataUri(file);
        //const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("grtin200g");
            return res.status(200).json({
                message: 'Already have a account with this email',
                success: false,
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role,
            profile:{
            }
        });
        //profilePhoto:cloudResponse.secure_url,
        console.log("Registered");

        return res.status(201).json({
            message: 'Account created successfully',
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            success: false
        });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate input
        if (!email || !password || !role) {
            console.log("sign st");

            return res.status(200).json({
                message: 'Input Missing',
                success: false,
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("email incrroct");

            return res.status(200).json({
                message: 'Incorrect email or password',
                success: false,
            });
        }

        // Check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log("password incorrect");
            return res.status(200).json({
                message: 'Incorrect email or password',
                success: false,
            });
        }

        // Check if role matches
        if (role !== user.role) {
            console.log("exist account");
            return res.status(200).json({
                message: 'Account does not exist with current role',
                success: false,
            });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Create response object for the user
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        };

        // Set the token as a cookie and send the response
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day expiration
            httpOnly: true,                    // Ensures cookie is inaccessible to JavaScript (prevents XSS attacks)
            sameSite: 'strict',                // Cookies will only be sent to the same origin
        }).json({
            message: `Welcome back ${user.fullname}`,
            success: true,
            user: userResponse
        });

    } catch (error) {
        console.error(error);
        console.log("error");

        return res.status(500).json({
            message: 'Something went wrong',
            success: false
        });
    }
}

// Logout User
export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            success: false
        });
    }
}

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills , experience , education, project } = req.body;
        
        //const file = req.file; // Handle file uploads if necessary
       
        //const fileUri = getDataUri(file);
        //const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray = [];
        if (skills) {
            skillsArray = skills.split(","); // Convert comma-separated string to an array
        }

        let experienceArray = [];
        if (experience) {
            experienceArray = experience.split(","); // Convert comma-separated string to an array
        }

        let educationArray = [];
        if (education) {
            educationArray = education.split(","); // Convert comma-separated string to an array
        }

        let projectArray = [];
        if (project) {
            projectArray = project.split(","); // Convert comma-separated string to an array
        }

        // Ensure that req.id exists (set by isAuthenticated middleware)
        // const userId = req.id;
        // if (!userId) {
        //     console.log('User not au');
        //     return res.status(200).json({
        //         message: 'User not authenticated',
        //         success: false,
        //     });
        // }

        // Find the user by ID
        let user = await User.findOne({email:email});
        console.log("dhshss",user);
        //user=user

        // Check if user exists
        if (!user) {
            console.log('User not found');
            return res.status(200).json({
                message: 'User not found',
                success: false
            });
        }

        // Update user data only if values are provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;
         if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        if (experience) user.profile.experience = experienceArray;
        if (education) user.profile.education = educationArray;
        if (project) user.profile.project = projectArray;

        //resume
        // if(cloudResponse){
        //     user.profile.resume = cloudResponse.secure_url //save the cloudinary url
        //     user.profile.resumeOriginalName = file.originalname //save the original file name
        // }

        // Save updated user data
        await user.save();

        // Prepare the response object
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        }
        console.log('Profile updated successfully.');

        return res.status(200).json(
            {
            message: "Profile updated successfully.",
            user: updatedUser,
            success: true
        });

    } catch (error) {
        console.error(error);
        console.log('Profile updated successfully.'); // Log the error to console for debugging
        return res.status(500).json({
            message: 'Something went wrong',
            success: false,
            error: error.message // Return error message for debugging
        });
    }
}
