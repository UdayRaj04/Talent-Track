import { React, useEffect, useState } from 'react'
import '../css/signup.css'
import { USER_API_END_POINT } from '../apis/constant.js';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/authSlice.js';


const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("singup form");
        console.log(input);
        var data = JSON.stringify(input);
        console.log(data);
        // const done = await axios.post(`${USER_API_END_POINT}/login`, data, {
        //     headers: { "Content-Type": "application/json" }
        //     // withCredentials: true,
        // });
        try{
            console.log("try");
            console.error("erroring");
            const done = await axios.post(`${USER_API_END_POINT}/login`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log(done);
            console.log("sign call");

            if (done.data.success) {
                //toast.success(input.message, { position: "top-right" });
                dispatch(setUser(done.data.user));
                alert(done.data.message);
                navigate("/");
            }
            else {
                console.log("doing");
                alert(done.data.message);
                //toast.success(input.message, { position: "top-right" });
            }
        }catch(e){
            console.log("catch",e);
            console.log("Signup Error:", e);
            alert(e.response?.data?.message || "Something went wrong.");
        }finally{
            console.log("finnaly");
        }
        console.log("doneeeeee");
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })


    return (<>
        <div className="sign">
            <form onSubmit={submitHandler} className="sign_con">
                <h1>LogIN</h1>
                <div>
                    <label className="label1">Email</label>
                    <input placeholder="Email" type="email" className="input1" value={input.email} name="email" onChange={changeEventHandler} required />
                </div>
                <div>
                    <label className="label1">Password</label>
                    <input placeholder="Password" type="password" className="input1" value={input.password} name="password" onChange={changeEventHandler} required />
                </div>
                <div className="radio-group">
                    <label className="radio-label">
                        <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer" />Student</label>
                    <label className="radio-label">
                        <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer" />Recruiter</label>
                </div>



                <div>
                    <button className="btn">LogIN</button>
                </div>
                <div className="re">
                    Don't have an account?
                    <a type="button" className="button1" href='/signUP'>Go to SIGNUP</a>
                </div>

            </form>
        </div>
    </>
    )
}

export default Login
