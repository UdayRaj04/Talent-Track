import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchJobByText } from '../redux/jobSlice';
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs.jsx'
import '../css/adminjob.css'

const AdminJobs = () => {

    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        console.log('called');
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])


    return (
        <div className="job-container">
            <div className="job-header">
                <input
                    className="search-input"
                    placeholder="Filter by name, role"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="new-job-btn" onClick={() => navigate("/admin/jobs/create")}>
                    New Job
                </button>
            </div>

            <div className="data">
                <h1 className="job-title">A list of your recently posted jobs</h1>
                <table className="job-table">
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Role</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterJobs?.map((job) => (
                            <tr key={job._id}>
                                <td>{job?.company?.name}</td>
                                <td>{job?.title}</td>
                                <td>{job?.createdAt.split("T")[0]}</td>
                                <td>
                                    <a href={`/admin/companies/${job._id}`} className="button edit-btn">
                                        Edit
                                    </a>
                                    <a href={`/admin/jobs/${job._id}/applicants`} className="button applicants-btn">
                                        Applicants
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminJobs