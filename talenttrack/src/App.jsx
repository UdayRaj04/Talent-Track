import React from "react"
import "./App.css"
import { BrowserRouter,Routes,Route, replace } from 'react-router-dom'
import Login from "./components/Login"
import Signup from "./components/Signup"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import Jobdes from "./components/Jobdes"
import Resume from "./components/Resume"
import AdminCompany from "./components/AdminCompany"
import AdminJobpost from "./components/AdminJobpost"
import AdminCompanycreate from "./components/AdminCompanycreate"
import AdminCompanySetup from "./components/AdminCompanySetup"
import AdminJobs from "./components/AdminJobs"
import AdminJobApplicants from "./components/AdminJobApplicants"
import Protected from "./components/Protected"
import Chatbot from "./components/Chatbot"
import ResumePDF from "./components/ResumePDF"
import ResumeApplicant from "./components/ResumeApplicant"


// const appRouter = createBrowserRouter([
//   <Navbar/>
//   {
//     path: '/',
//     element: <Home/>
//   },
//   {
//     path: '/login',
//     element: <Login/>
//   },
//   {
//     path: '/signup',
//     element: <Signup/>
//   }
// ])


function App() {

  return (
    < div className="bg">
     <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/job' element={<Jobs/>}></Route>
        <Route path='/browse' element={<Browse/>}></Route>
        <Route path='/chatbot' element={<Chatbot/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/job/des/:id' element={<Jobdes/>}></Route>
        <Route path='/resume' element={<Resume/>}></Route>
        <Route path='/resumepdf' element={<ResumePDF/>}></Route>
        <Route path='/admin/companies' element={<Protected><AdminCompany/></Protected>}></Route>
        <Route path='/admin/companies/create' element={<Protected><AdminCompanycreate/></Protected>}></Route>
        <Route path='/admin/companies/:id' element={<Protected><AdminCompanySetup/></Protected>}></Route>
        <Route path='/admin/jobs' element={<Protected><AdminJobs/></Protected>}></Route>
        <Route path='/admin/jobs/create' element={<Protected><AdminJobpost/></Protected>}></Route>
        
        <Route path="/resumeapplicant/:id" element={<Protected><ResumeApplicant/></Protected>}></Route>

        <Route path="/admin/jobs/:id/applicants" element={<Protected><AdminJobApplicants/></Protected>}></Route>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App
