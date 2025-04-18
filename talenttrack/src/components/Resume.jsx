import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../apis/constant.js';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice.js';
import '../css/resume1.css'
import ResumePDF from './ResumePDF.jsx';



const Resume = () => {

    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phonenumber: user?.phonenumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        experience: user?.profile?.experience?.map(experienc => experienc) || "",
        education: user?.profile?.education?.map(educat => educat) || "",
        project: user?.profile?.project?.map(proj => proj) || "",
    });

    //{ fullname, email, phonenumber, bio, skills , experience , education, project }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phonenumber", input.phonenumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("experience", input.experience);
        formData.append("education", input.education);
        formData.append("project", input.project);


        // console.log("Form data:", Object.fromEntries(formData.entries()));
        //     var Data =JSON.stringify(Object.fromEntries(formData.entries()));
        //     console.log(Data);

    
        //     const { data } = await axios.post(`${USER_API_END_POINT}/register`, Data, {
        //         headers: { "Content-Type": "application/json" }
        //         //withCredentials: true,
        //     });
        //var Data =JSON.stringify(Object.fromEntries(formData.entries()));
        try {
            console.log("Form data:", Object.fromEntries(formData.entries()));
            var Data =JSON.stringify(Object.fromEntries(formData.entries()));
            console.log("donefrgee",Object.fromEntries(formData.entries()));
            console.log("doneee",Data);


            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, Data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true

            });
            console.log(Data);
            //var res =JSON.stringify(Object.fromEntries(dataa.entries()));
            console.log("doneeesgegsg",res);
            console.log("update call");
            if (res.data.success) {
                console.log("ISSUE in updating");
                //dispatch(setUser(res.data.user));
                await axios.get(`http://localhost:5000/resumeapplicant/${user._id}`).then((res)=>{
                    console.log("User Data:", res.data);
                    dispatch(setUser(res.data));
                }).catch((error) => console.error("Error fetching user data:", error));
                alert(res.data.message);
                //   toast.success(res.data.message);
            }
        } catch (error) {
            console.log("fwetw",error);
            alert(error.response.data.message);
            //toast.error(error.response.data.message);
        } finally {
            console.log("updating")
        }

        //setOpen(false);
    }

    return (
        <>
            <div>
            <h1 className='cc'>Update and Download Resume</h1>
                <form className='formm' onSubmit={submitHandler}>
                    <div>
                        <div>
                            <label className='labell' htmlFor="name">Name</label>
                            <input
                            className='inputt'
                                id="name"
                                name="name"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <label className='labell' htmlFor="email">Email</label>
                            <input className='inputt'
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <label className='labell' htmlFor="number">Number</label>
                            <input className='inputt'
                                id="number"
                                name="number"
                                value={input.phonenumber}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <label className='labell' htmlFor="bio">Bio</label>
                            <input className='inputt'
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <label className='labell' htmlFor="skills">Skills</label>
                            <input className='inputt'
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <label className='labell' htmlFor="experience">Experience</label>
                            <input className='inputt'
                                id="experience"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <label className='labell' htmlFor="education">Education</label>
                            <input className='inputt'
                                id="education"
                                name="education"
                                value={input.education}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <label className='labell' htmlFor="project">Project</label>
                            <input className='inputt'
                                id="project"
                                name="project"
                                value={input.project}
                                onChange={changeEventHandler}
                            />
                        </div>



                    </div>
                    <button className='buttonn' type="submit">Update</button>

                </form>
                <div>
                        <ResumePDF/>
                    </div>
            </div>
        </>
    )



    //   return (<>
    //     <div>
    //     <form onSubmit={submitHandler}>
    //                       <div >
    //                           <div >
    //                               <Label htmlFor="name" className="text-right">Name</Label>
    //                               <Input
    //                                   id="name"
    //                                   name="name"
    //                                   type="text"
    //                                   value={input.fullname}
    //                                   onChange={changeEventHandler}
    //                                   className="col-span-3"
    //                               />
    //                           </div>
    //                           <div >
    //                               <Label htmlFor="email" className="text-right">Email</Label>
    //                               <Input
    //                                   id="email"
    //                                   name="email"
    //                                   type="email"
    //                                   value={input.email}
    //                                   onChange={changeEventHandler}
    //                                   className="col-span-3"
    //                               />
    //                           </div>
    //                           <div >
    //                               <Label htmlFor="number" className="text-right">Number</Label>
    //                               <Input
    //                                   id="number"
    //                                   name="number"
    //                                   value={input.phonenumber}
    //                                   onChange={changeEventHandler}
    //                                   className="col-span-3"
    //                               />
    //                           </div>
    //                           <div >
    //                               <Label htmlFor="bio" className="text-right">Bio</Label>
    //                               <Input
    //                                   id="bio"
    //                                   name="bio"
    //                                   value={input.bio}
    //                                   onChange={changeEventHandler}
    //                                   className="col-span-3"
    //                               />
    //                           </div>
    //                           <div >
    //                               <Label htmlFor="skills" className="text-right">Skills</Label>
    //                               <Input
    //                                   id="skills"
    //                                   name="skills"
    //                                   value={input.skills}
    //                                   onChange={changeEventHandler}
    //                                   className="col-span-3"
    //                               />
    //                           </div>
    //                       </div>
    //                              <Button type="submit" className="w-full my-4">Update</Button>
    //                   </form>
    //     </div>
    //   </>
    //   )

}

export default Resume