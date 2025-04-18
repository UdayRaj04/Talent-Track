import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSingleJob } from '../redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../apis/constant.js';
import '../css/jobdes.css'

const Jobdes = () => {

    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    console.log("job id",jobId);
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}`,{method: "GET", withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                alert(res.data.message);
                //toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            //toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/job/${params.id}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);


    return (
        <>
        
            <div className="job-containerr">
            <div className="job-description">
                <h2>Job Description</h2>
            </div>
            <h1 className="job-title">{singleJob?.title}</h1>

            <div className="job-details">
            <p><strong>Description:</strong> {singleJob?.description}</p>
                <p><strong>Position:</strong> {singleJob?.postion}</p>
                <p><strong>Job Type:</strong> {singleJob?.jobType}</p>
                <p><strong>Salary:</strong> {singleJob?.salary} LPA</p>
                <p><strong>Location:</strong> {singleJob?.location}</p>
                <p><strong>Experience:</strong> {singleJob?.experienceLevel} yrs</p>
                <p><strong>Total Applicants:</strong> {singleJob?.applications?.length}</p>
                <p><strong>Posted Date:</strong> {singleJob?.createdAt.split("T")[0]}</p>
            </div>

            <button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`apply-button ${isApplied ? "disabled" : "enabled"}`}
            >
                {isApplied ? "Already Applied" : "Apply Now"}
            </button>

        </div>
        </>
    )
}

export default Jobdes