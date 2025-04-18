import React from 'react'
import "../css/jobs.css"
import Jobdes from './Jobdes'
import { useNavigate } from 'react-router-dom';

const Job = ({job}) => {
    const navigate = useNavigate();
    //const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }


    return (<>
        <div className="cardd">
            <p >{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            <div className="done" >
                <div >
                    <h2 >{job?.company?.name}</h2>
                    <p>INDIA</p>
                </div>
                <img src="company.png" alt="Avatar" class="av"></img>
            </div>
            <div className='abbb'>
                <h2 className="fo">{job?.title}</h2>
                <p>{job?.description} </p>

            </div>
            <div>
                <p class="badge">{job?.position} postion</p>
                <p class="badge">{job?.jobType}</p>
                <p class="badge">{job?.salary}LPA</p>
            </div>
            <div className="ok">
                <button onClick={() => navigate(`/job/des/${job?._id}`)}  className="btna">Details</button>
                <button className="btna">Save lator</button>
            </div>

        </div>
    </>)
}

export default Job