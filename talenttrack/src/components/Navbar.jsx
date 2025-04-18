import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import '../css/nav.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../apis/constant.js';
import { setUser } from '../redux/authSlice.js';
import { setFilterQuery , setSearchedQuery } from '../redux/jobSlice.js';

const Navbar = () => {

  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        Navigate("/");
        alert(res.data.message);
        //toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      //toast.error(error.response.data.message);
    }
  }



  return (
    <>
      <div className="zx">
        {user &&
          <div class="popover__wrapper">
            <button class="popover__button">
              <img src="../../public/profile.png" alt="Avatar" class="avatar"></img></button>
            <div class="popover__content">
              <div class="abc">
                <img src="../../public/avatar.png" alt="Avatar" class="avatar"></img>
                <p>User:- {user?.fullname}</p>
              </div>
              <p>Bio:- {user?.profile?.bio}</p>
              <p>Email:- {user?.email}</p>
              <p>Number:-{user?.phonenumber}</p>

              <div>
                <NavLink to="/profile"><a className="butout" >View Profile</a></NavLink>
                {/* <NavLink to="/profile"><a className="butout" >Logout</a></NavLink> */}
                <button onClick={logoutHandler} className="butout">Logout</button>
              </div>
            </div>
          </div>
        }</div>
      <div className="y">
        <div className="z">
          <img className="logo" src="../../public/logo.png" alt="Logo"></img>
          <h1 id='ab'>Talent<span id="a" >track</span></h1>
        </div>
        <div className="xx">
          {/* <ul className="x">
            <li>Home</li>
            <li>Resume</li>
            <li>Jobs</li>
            <li>browes</li>
            <li>Contact</li>
            <li><NavLink>Home</NavLink></li>
          <li><NavLink>Home</NavLink></li>
          <li><NavLink>Home</NavLink></li>
          <li><NavLink>Home</NavLink></li>
          <li><NavLink>Home</NavLink></li>
          </ul> 
          user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            )*/}
          {
            user && user.role === 'recruiter' ? (
                                <div class="topnav" >
                                <NavLink to="/admin/companies" ><a >Company</a></NavLink>
                                <NavLink to="/admin/jobs" ><a >Jobs</a></NavLink>
                                <NavLink to="/chatbot" ><a >Chatbot</a></NavLink>
                                </div>
                            )
            :(!user ? (

              <div class="topnav">
              
                <NavLink to="/" onClick={()=>{dispatch(setFilterQuery("")); dispatch(setSearchedQuery(""))}} ><a >Home</a></NavLink>
                {user &&
                  <NavLink to="/resume" ><a >Resume</a></NavLink>
                }
                <NavLink to="/job" ><a >Jobs</a></NavLink>
                <NavLink to="/browse"  onClick={()=>{dispatch(setFilterQuery("")); dispatch(setSearchedQuery(""))}}  ><a >Browess</a></NavLink>
                <NavLink to="/chatbot" ><a >Chatbot</a></NavLink>
                <NavLink to="/login" ><a >Login</a></NavLink>
                <NavLink to="/signup"><a >Signup</a></NavLink>
              </div>) : (
              <div class="topnav">
                <NavLink to="/"  onClick={()=>{dispatch(setFilterQuery("")); dispatch(setSearchedQuery(""))}}  ><a >Home</a></NavLink>
                {user &&
                  <NavLink to="/resume" ><a >Resume</a></NavLink>
                }
                <NavLink to="/job" ><a >Jobs</a></NavLink>
                <NavLink to="/browse"  onClick={()=>{dispatch(setFilterQuery("")); dispatch(setSearchedQuery(""))}}  ><a >Browess</a></NavLink>
                <NavLink to="/chatbot" ><a >Chatbot</a></NavLink>
              </div>))
          }
        </div>
      </div>

      <div className='mobile'>
        <div class="popover__wrapper">
          <button class="popover__button">
            <img src="../../public/profile.png" alt="Avatar" class="avatar"></img></button>
          <div class="popover__content">
            <div>
              {/* <ul className="x">
            <li>Home</li>
            <li>Resume</li>
            <li>Jobs</li>
            <li>browes</li>
            <li>Contact</li>
            <li><NavLink>Home</NavLink></li>
          <li><NavLink>Home</NavLink></li>
          <li><NavLink>Home</NavLink></li>
          <li><NavLink>Home</NavLink></li>
          <li><NavLink>Home</NavLink></li>
          </ul> */}
{user && user.role === 'recruiter' ? (
                                <div class="mobile-a">
                                <NavLink to="/admin/companies" ><a >Company</a></NavLink>
                                <NavLink to="/admin/jobs" ><a >Jobs</a></NavLink>
                                <NavLink to="/chatbot" ><a >Chatbot</a></NavLink>
                                </div>
                            )
            :(
              <div class="mobile-a">
                <a class="active" href="/"  onClick={()=>{dispatch(setFilterQuery("")); dispatch(setSearchedQuery(""))}}  >Home</a><br></br>
                {user &&
                  <div>
                    <a href="/resume">Resume</a><br></br>
                  </div>
                }
                <a href="/job">Jobs</a><br></br>
                <a href="/browse"  onClick={()=>{dispatch(setFilterQuery("")); dispatch(setSearchedQuery(""))}}  >browes</a><br></br>
                <a href="/chatbot">Chatbot</a><br></br>
                <NavLink to="/login" ><a >Login</a></NavLink><br></br>
                <NavLink to="/signup"><a >Signup</a></NavLink>
              </div>)}

            </div>

            {
              user &&
              <div className="popover__wrapperss">
                <div className="abc">
                  <img src="../../public/avatar.png" alt="Avatar" className="avatar" />
                  <p>User:- {user?.fullname}</p>
                </div>
                <p>Bio:- {user?.profile?.bio}</p>
                <p>Email:- {user?.email}</p>
                <p>Number:-{user?.phonenumber}</p>

                <div>
                  <NavLink to="/profile"><a className="butout" >View Profile</a></NavLink>
                  {/* <NavLink onClick={logoutHandler}><a className="butout" >Logout</a></NavLink> */}
                  <button onClick={logoutHandler} className="butout">Logout</button>
                </div>
              </div>
            }

          </div>
        </div>
        <div className="z">
          <img className="logo" src="../../public/logo.png"></img>
          <h1 id='aba'>Talent<span id="aa" >track</span></h1>
        </div>

      </div>
    </>
  )
}

export default Navbar