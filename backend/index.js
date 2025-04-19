import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './utils/db.js';

import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";  

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.set('trust proxy', 1);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'https://talenttrack-hzjq.onrender.com',  // Your frontend URL
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



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend
app.use(express.static(path.join(__dirname, 'talenttrack/build'))); // adjust path if needed

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'talenttrack', 'build', 'index.html'));
});





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
