import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAllApplicants } from '../redux/applicationSlice.js';
import { APPLICATION_API_END_POINT } from '../apis/constant.js';
import '../css/adminaplicant.css'

const shortlistingStatus = ["Accepted", "Rejected"];

const AdminJobApplicants = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/job/${params.id}`, { withCredentials: true })
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/${id}/status`, { status });
            console.log(res);
            if (res.data.success) {
                alert(res.data.message);
                //toast.success(res.data.message);

            }
        } catch (error) {
            alert(error.response.data.message);
            //toast.error(error.response.data.message);
        }
    }


    return (

        <div className="applicants-container">
        <h1 className="applicants-title">Applicants ({applicants?.applications?.length || 0})</h1>

        <div className="data">
            <h1 className="sub-title">A list of your recently applied users</h1>
            <table className="applicants-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Resume</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants?.applications?.map((item) => (
                        <tr key={item._id}>
                            <td>{item?.applicant?.fullname}</td>
                            <td>{item?.applicant?.email}</td>
                            <td>{item?.applicant?.phonenumber}</td>
                            <td>
                            <button className="back-button" onClick={() => navigate(`/resumeapplicant/${item?.applicant?._id}`)}>
            <span>Resume</span>
          </button>
                            </td>
                            <td>{item?.applicant?.createdAt.split("T")[0]}</td>
                            <td>
                            <h2>{item?.status}</h2>
                                <div className="status-dropdown">
                                    <button className="status-button" onClick={() => setIsOpen(!isOpen)}>
                                        Update Status
                                    </button>
                                    {isOpen && (
                                        <div className="dropdown-menu">
                                            {shortlistingStatus.map((status, index) => (
                                                <button
                                                    key={index}
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        statusHandler(status, item?._id);
                                                        setIsOpen(false);
                                                    }}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>


        // <div>
        //     <h1>Applicants {applicants?.applications?.length}</h1>

        //     <div className="data">
        //         <h1>A list of your recent applied user</h1>
        //         <table>
        //             <tr>
        //                 <th>FullName</th>
        //                 <th>Email</th>
        //                 <th>Contact</th>
        //                 <th>Resume</th>
        //                 <th>Date</th>
        //             </tr>
        //             {
        //                 applicants && applicants?.applications?.map((item) => (
        //                     <tr key={item._id}>
        //                         <td>{item?.applicant?.fullname}</td>
        //                         <td>{item?.applicant?.email}</td>
        //                         <td>{item?.applicant?.phonenumber}</td>
        //                         <td >
        //                             {/* {
        //                                 item.applicant?.profile?.resume ? <a  href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
        //                             } */}
        //                             RESUME
        //                         </td>
        //                         <td>{item?.applicant.createdAt.split("T")[0]}</td>
        //                         <td>

        //                         <td>
        //     <div onClick={() => setIsOpen(!isOpen)}>
        //         Update Status{/* More options icon */}
        //     </div>
        //     {isOpen && (
        //         <div >
        //             {shortlistingStatus.map((status, index) => (
        //                 <button
        //                     key={index}
        //                     onClick={() => {
        //                         statusHandler(status, item?._id);
        //                         setIsOpen(false);
        //                     }}
        //                 >
        //                     <span>{status}</span>
        //                 </button>
        //             ))}
        //         </div>
        //     )}
        // </td>

        //                             {/* {
        //                                 shortlistingStatus.map((status, index) => {
        //                                     return (
        //                                         <div onClick={() => statusHandler(status, item?._id)} key={index} >
        //                                             <span>{status}</span>
        //                                         </div>
        //                                     )
        //                                 })
        //                             } */}
        //                         </td>

        //                     </tr>
        //                 ))
        //             }

        //         </table>
        //     </div>
        // </div>
    )
}

export default AdminJobApplicants