import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';

import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";  

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'https://talent-track-green.vercel.app',  // Your frontend URL
    credentials: true,                // Allow credentials (cookies, authorization headers, etc.)
};

// const corsOptions = {
//     origin: 'https://talenttrack-hzjq.onrender.com',  // Your frontend URL
//     credentials: true,                // Allow credentials (cookies, authorization headers, etc.)
// };


app.use(cors(corsOptions)); // Apply CORS middleware

// API routes
app.use("/talenttrack/user", userRoute);
app.use("/resumeapplicant", userRoute);
app.use("/talenttrack/company", companyRoute);
app.use("/talenttrack/job", jobRoute);
app.use("/talenttrack/application", applicationRoute);  





// Start server
const PORT = process.env.PORT || 8080;  // Changed port to 8080
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});

// app.get("/status",(req,res)=>{
//     res.send({
//         "uday":"sharma"
//     })
// })
