import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Jobapptable from './Jobapptable';
import { useSelector } from 'react-redux';
import useGetAplliedJobs from '../hooks/useGetAppliedJobs'
import '../css/profile.css'

const skills = ["Html", "Css", "Javascript", "Reactjs"];

const Profile = () => {
    useGetAplliedJobs();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);


  return (
    <>
    <div className="profile-container">
        <div className="profile-header">
            <img src="avatar.png" alt="Avatar" className="avatarr" />
            <div>
                <h1>{user?.fullname}</h1>
                <p>{user?.profile?.bio}</p>
            </div>
        </div>
        <NavLink to="/resume">
            <a className="edit-profile-btn">Edit Profile</a>
        </NavLink>

        <div className="profile-info">
            <span>Email: {user?.email}</span>
            <span>Phone: {user?.phonenumber}</span>
        </div>

        <div className="skills-section">
            <h1>Skills</h1>
            <div className="skills-container">
                {user?.profile?.skills.length !== 0 
                    ? user?.profile?.skills.map((item, index) => (
                        <h1 key={index}>{item}</h1>
                      )) 
                    : <span>NA</span>
                }
            </div>
        </div>

        <div className="resume-section">
        <button className='edit-profile-btn' onClick={() => navigate('/resumepdf')}>
            Resume
        </button>
        </div>

        <div className="applied-jobs-section">
            <h1>Applied Jobs</h1>
        </div>
        <div className='job'><Jobapptable /></div>
    </div>
</>

//   <>
//     <div >
//                 <div >
//                     <div >
//                     <img src="avatar.png" alt="Avatar" class="avatar"></img>
//                         <div>
//                             <h1 >{user?.fullname}</h1>
//                             <p>{user?.profile?.bio}</p>
//                         </div>
//                     </div>
//                    <NavLink to="/resume"><a  >Edit Profile</a></NavLink>
//                 </div>
//                 <div>
//                     <div>
//                         <span>{user?.email}</span>
//                     </div>
//                     <div>
//                         <span>{user?.phonenumber}</span>
//                     </div>
//                 </div>
//                 <div>
//                     <h1>Skills</h1>
//                     <div>
//                         {
//                             user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <h1 key={index}>{item}</h1>) : <span>NA</span>
//                         }
//                     </div>
//                 </div>
//                 <div>
//                     <h1>Resume</h1>
//                 </div>
//                 <div >
//                 <h1 >Applied Jobs</h1>
//                <Jobapptable/>
//             </div>
//             {/* <UpdateProfileDialog open={open} setOpen={setOpen}/> */}
//             </div>
//   </>
  )
}

export default Profile