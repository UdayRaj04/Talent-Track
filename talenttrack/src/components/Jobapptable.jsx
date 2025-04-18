import React from 'react'
import '../css/profile.css'
import { useSelector } from 'react-redux';

const data=[
    {id: '1',name:'Uday Raj',age:20,location:'Kolkata',image:'/logo_e.png'},
    {id: '2',name:'John Goli',age:22,location:'Mumbai',image:'/logo_e.png'},
    {id: '1',name:'Uday Raj',age:20,location:'Kolkata',image:'logo_e.png'},
    {id: '2',name:'John Goli',age:22,location:'Mumbai',image:'logo_e.png'},
    {id: '1',name:'Uday Raj',age:20,location:'Kolkata',image:'logo_e.png'},
    {id: '2',name:'John Goli',age:22,location:'Mumbai',image:'logo_e.png'},
    {id: '1',name:'Uday Raj',age:20,location:'Kolkata',image:'logo_e.png'},
    {id: '2',name:'John Goli',age:22,location:'Mumbai',image:'logo_e.png'},
    {id: '1',name:'Uday Raj',age:20,location:'Kolkata',image:'logo_e.png'},
    {id: '2',name:'John Goli',age:22,location:'Mumbai',image:'logo_e.png'},

]

const Jobapptable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
  return (<>
    <div className="data">
    <h3>A list of your applied jobs</h3>
    <table>
        <tr>
            <th>DATE</th>
            <th>JOB ROLE</th>
            <th>Company</th>
            <th>Status</th>
        </tr>
        {
                        allAppliedJobs?.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs?.map((appliedJob) => (
                            <tr key={appliedJob?._id}>
                                <td>{appliedJob?.createdAt?.split("T")[0]}</td>
                                <td>{appliedJob?.job?.title}</td>
                                <td>{appliedJob?.job?.company?.name}</td>
                                <td><button className='but'>{appliedJob.status.toUpperCase()}</button></td>
                                {/* className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`} */}
                            </tr>
                        ))
                    }
        {/* {
            data.map((x)=>(
                <tr>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.age}</td>
                    <td>{x.location}</td>
                </tr>
            )
            )
        } */}
    </table>
    </div>
  </>
  )
}

export default Jobapptable