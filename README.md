# TalentTrack

TalentTrack is a MERN-stack job portal platform built with React (frontend) and Node.js/Express (backend).
🌐 **Live Website**: [https://talenttrack-hzjq.onrender.com](https://talenttrack-hzjq.onrender.com)


## Features

- Authentication:  Secure signup/login for users and companies.
- Job Listings: Browse, filter, and search jobs.
- Application Tracking: Users can view applied jobs and application status.
- Resume Upload: Upload and generate PDF resumes.
- Company Management: Companies can create profiles, post jobs, and review applicants.
- Admin Controls: Admins can approve companies, manage job posts, and oversee applications.
- Chatbot: Integrated chatbot for user assistance.

## 🏗️ Tech Stack

- **Frontend**: React.js, HTML5, CSS3
- **Frontend**: Node.js, Express, MongoDB
- **Hosting**: Render Hosting

## Getting Started  Clone the repository
 ```sh
git clone https://github.com/UdayRaj04/Talent-Track.git
cd talenttrack
```

## Configure Environment Variables
- Example for backend(.env):
 ```sh
MONGO_URL=your_mongo_url
PORT=5000
SECRET_KEY=your_secret
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```
- Example for Frontend(.env):
```sh
VITE_GEMINI_API_KEY=api_key
```

### Backend

1. Install dependencies:
    ```sh
    cd backend
    npm install
    ```
2. Set up your `.env` file with required environment variables (see `backend/.env`).
3. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Install dependencies:
    ```sh
    cd talenttrack
    npm install
    ```
2. Set up your `.env` file with your Gemini API key (see `talenttrack/.env`).
3. Start the frontend development server:
    ```sh
    npm run dev
    ```
