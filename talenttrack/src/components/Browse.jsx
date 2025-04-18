import React, { useEffect } from 'react'
import Job from './Job';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

//const randomJobs = [1, 2, 4];
const Browse = () => {

    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
            // dispatch(setFilterJobs(''));
        }
    },[])


    return (<div >
        <h1 >Search Results ({allJobs.length})</h1>
        <div className='job'>
            {
               allJobs.map((job) => {
                    return (
                        <Job key={job._id} job={job} />
                    )
                })
            }
        </div>

    </div>
    )
}

export default Browse