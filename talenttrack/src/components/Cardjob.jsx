import React from 'react'
import '../css/home.css'
import { useNavigate } from 'react-router-dom';

const Cardjob = ({job}) => {
  const navigate = useNavigate();
{/* <div onClick={()=> navigate(`/description/${job._id}`)} className="cardd"> */}

  return (<>
  <div onClick={()=> navigate(`/job/des/${job?._id}`)} className="cardd">
    <div>
        <h2 className="fo">{job?.company?.name}</h2>
        <p>India</p>
    </div>
    <div>
        <h2 className="fo">{job?.title}</h2>
        <p>{job?.description}</p>
    </div>
    <span class="badge">{job?.position} Positions</span>
    <span class="badge">{job?.jobType}</span>
    <span class="badge">{job?.salary}LPA</span>
    </div>
    </>
  )
}

export default Cardjob