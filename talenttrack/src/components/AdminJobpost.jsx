import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { JOB_API_END_POINT } from '../apis/constant.js'
import '../css/jobedit.css'

const AdminJobpost = () => {

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector(store => store.company);
  //companies.shift();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
    console.log(selectedCompany);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("ifhgdrhydh");
    console.log(companies);
    const selectedCo = companies.find((company) => company.name.toLowerCase() === document.getElementById("companySelect").value);
    input['companyId'] =selectedCo._id;
    try {
      console.log(input);
      const res = await axios.post(`${JOB_API_END_POINT}/job`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
      );
      console.log(res);
      if (res.data.success) {
        console.log("if");
        alert(res.data.message);
        //toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log("if catvh");
      alert(error.response.data.message);
      //toast.error(error.response.data.message);
    } finally {
      console.log("jodcreated");
      //setLoading(false);
    }
  }


  return (

    <div className="job-form-container">
    <form onSubmit={submitHandler} className="job-form">
        <h2 className="form-title">Post a New Job</h2>

        <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" value={input.title} onChange={changeEventHandler} />
        </div>

        <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" value={input.description} onChange={changeEventHandler} />
        </div>

        <div className="form-group">
            <label>Requirements</label>
            <input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
        </div>

        <div className="form-group">
            <label>Salary</label>
            <input type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
        </div>

        <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={input.location} onChange={changeEventHandler} />
        </div>

        <div className="form-group">
            <label>Job Type</label>
            <input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
        </div>

        <div className="form-group">
            <label>Experience Level</label>
            <input type="text" name="experience" value={input.experience} onChange={changeEventHandler} />
        </div>

        <div className="form-group">
            <label>No of Positions</label>
            <input type="number" name="position" value={input.position} onChange={changeEventHandler} />
        </div>

        <div className="form-group">
            <label>Company</label>
            <select id="companySelect" className="company-select" onChange={selectChangeHandler}>
                <option value="" disabled selected>Select a Company</option>
                {companies.map((company) => (
                    <option key={company.name} value={company?.name?.toLowerCase()}>
                        {company.name}
                    </option>
                ))}
            </select>
        </div>

        <button type="submit" className="submit-btn">Post New Job</button>

        {companies.length === 0 && (
            <p className="warning-text">*Please register a company first before posting a job.</p>
        )}
    </form>
</div>


    // <div>
    //   <form onSubmit={submitHandler}>
    //     <div>
    //       <div>
    //         <label>Title</label>
    //         <input
    //           type="text"
    //           name="title"
    //           value={input.title}
    //           onChange={changeEventHandler}
    //         />
    //       </div>
    //       <div>
    //         <label>Description</label>
    //         <input
    //           type="text"
    //           name="description"
    //           value={input.description}
    //           onChange={changeEventHandler}
    //         />
    //       </div>
    //       <div>
    //         <label>Requirements</label>
    //         <input
    //           type="text"
    //           name="requirements"
    //           value={input.requirements}
    //           onChange={changeEventHandler}
    //         />
    //       </div>
    //       <div>
    //         <label>Salary</label>
    //         <input
    //           type="text"
    //           name="salary"
    //           value={input.salary}
    //           onChange={changeEventHandler}
    //         />
    //       </div>
    //       <div>
    //         <label>Location</label>
    //         <input
    //           type="text"
    //           name="location"
    //           value={input.location}
    //           onChange={changeEventHandler}
    //         />
    //       </div>
    //       <div>
    //         <label>Job Type</label>
    //         <input
    //           type="text"
    //           name="jobType"
    //           value={input.jobType}
    //           onChange={changeEventHandler}
    //         />
    //       </div>
    //       <div>
    //         <label>Experience Level</label>
    //         <input
    //           type="text"
    //           name="experience"
    //           value={input.experience}
    //           onChange={changeEventHandler}
    //         />
    //       </div>
    //       <div>
    //         <label>No of Postion</label>
    //         <input
    //           type="number"
    //           name="position"
    //           value={input.position}
    //           onChange={changeEventHandler}
    //         />
    //       </div>
    //       <select id="companySelect" class="w-[180px]"  onValueChange={selectChangeHandler}>
    //       {/* <option value="" disabled selected>Select a Company</option> */}
    //         {
            
    //           companies.map((company) => {
    //             return (
    //               <option  value={company?.name?.toLowerCase()} >{company.name}</option>)
    //           })
    //         }
    //       </select>
    //       {/* {
    //                         companies.length > 0 && (
    //                             <Select onValueChange={selectChangeHandler}>
    //                                 <SelectTrigger className="w-[180px]">
    //                                     <SelectValue placeholder="Select a Company" />
    //                                 </SelectTrigger>
    //                                 <SelectContent>
    //                                     <SelectGroup>
    //                                         {
    //                                             companies.map((company) => {
    //                                                 return (
    //                                                     <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
    //                                                 )
    //                                             })
    //                                         }

    //                                     </SelectGroup>
    //                                 </SelectContent>
    //                             </Select>
    //                         )
    //                     } */}
    //     </div>
    //     <button type="submit">Post New Job</button>
    //     {
    //       companies.length === 0 && <p >*Please register a company first, before posting a jobs</p>
    //     }
    //   </form>
    // </div>
  )
}

export default AdminJobpost