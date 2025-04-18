import {React , useEffect,useState} from 'react'
import '../css/signup.css'
import { USER_API_END_POINT } from '../apis/constant.js';
import axios from 'axios';
import { setLoading } from '../redux/authSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        role: ""
    });

    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    // const changeFileHandler = (e) => {
    //     setInput({ ...input, file: e.target.files?.[0] });
    // }

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     console.log("singup form");
    //     const formData = new FormData();
    //     formData.append("fullname", input.fullname);
    //     formData.append("email", input.email);
    //     formData.append("phonenumber", input.phonenumber);  // Ensure this field is appended correctly
    //     formData.append("password", input.password);
    //     formData.append("role", input.role);

    //     // Debugging log for formData before submission
    //     console.log("Form data:", input);

    //     try {
    //         dispatch(setLoading(true));
    //         await axios.post(`${USER_API_END_POINT}/register`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             },
    //             withCredentials: true,

    //         });

    //         if (res.data.success) {
    //             toast.success(res.data.message, { position: "top-right" });
    //             navigate("/login");
    //         }
    //     } catch (error) {
    //         console.error("Signup Error:", error);
    //         toast.error(error.response?.data?.message || "Something went wrong.", { position: "top-right" });
    //     } finally {
    //         dispatch(setLoading(false));
    //     }
    // };
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Signup form submitted");
    
        try {
            dispatch(setLoading(true));
    
            const { fullname, email, phonenumber, password, role } = input;
            const formData = new FormData();
            Object.entries({ fullname, email, phonenumber, password, role }).forEach(([key, value]) =>
                formData.append(key, value)
            );
    
            console.log("Form data:", Object.fromEntries(formData.entries()));
            var Data =JSON.stringify(Object.fromEntries(formData.entries()));
            console.log(Data);

    
            const { data } = await axios.post(`${USER_API_END_POINT}/register`, Data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });


            console.log("call done");
    
            if (data.success) {
                toast.success(data.message, { position: "top-right" });
                alert(data.message);
                navigate("/login");
            }
            else{
                console.log("doing");
                alert(data.message);
                toast.success(data.message, { position: "top-right" });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.", { position: "top-right" });
            console.error("Signup Error:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };
    
    


    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    

    return (<>
        <div className="sign">
            <form onSubmit={submitHandler} className="sign_con">
                <h1>SignUP</h1>
                <div>
                    <label className="label1">Full Name</label>
                    <input  placeholder="Full Name" type="text" className="input1" value={input.fullname} name="fullname" onChange={changeEventHandler} required />
                </div>
                <div>
                    <label className="label1">Email</label>
                    <input placeholder="Email" type="email" className="input1" value={input.email} name="email" onChange={changeEventHandler} required />
                </div>
                <div>
                    <label className="label1">Phone Number</label>
                    <input placeholder="Phone Number" type="text" className="input1" value={input.phonenumber} name="phonenumber" onChange={changeEventHandler} required />
                </div>
                <div>
                    <label className="label1">Password</label>
                    <input placeholder="Password" type="password" className="input1" value={input.password} name="password" onChange={changeEventHandler} required />
                </div>
                <div className="radio-group">
                    <label className="radio-label">
                        <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer"/>Student</label>
                    <label className="radio-label">
                        <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer"/>Recruiter</label>
                </div>


                <div>
                
                    <button className="btn">SignUP</button>
                </div>
                <div className="re">
                    Already have an account?
                    <a type="button" className="button1" href='/login'>Go to Login</a>
                </div>

            </form>
        </div>
    </>
    )
}

export default Signup