import React, { useEffect, useState } from 'react'
import Filtercard from './Filtercard'
import Job from './Job';
import '../css/jobs.css'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { setFilterQuery } from "../redux/jobSlice";
//import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';

//const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleCollapse = () => {
    if (isMobile) setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize(); // set initially
    window.addEventListener("resize", handleResize); // update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    //const { allJobs } = useSelector(store => store.job);
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    var alljoball = allJobs;
    const [filterJobs, setFilterJobs] = useState(alljoball);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(searchedQuery);
        if (searchedQuery && searchedQuery!="All") {
            const filteredJobs = alljoball.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs);
            if (document.hidden){
                dispatch(setFilterQuery(''));
            }
        } else {
            console.log("ALL JOB");
            setFilterJobs(alljoball);
            dispatch(setFilterQuery(''));
        }
    }, [alljoball, searchedQuery]);

    document.addEventListener("visibilitychange",()=>{
        console.log("document"+document);
        if (document.hidden){
            dispatch(setFilterQuery(''));
        }
    })


    return (<>
        <div className="ab">
        {isMobile && (
        <button
          type="button"
          className="collapsible"
          onClick={toggleCollapse}
        >
          Filter--
        </button>
      )}

      <div
        className="filter"
        style={{
          display: isMobile ? (isCollapsed ? "block" : "none") : "block",
        }}
      >
        <Filtercard />
      </div>
            <div className="arr">
            {/* {
            filterJobs.map((job) => (
                                            <motion.div
                                                // initial={{ opacity: 0, x: 100 }}
                                                // animate={{ opacity: 1, x: 0 }}
                                                // exit={{ opacity: 0, x: -100 }}
                                                // transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))} */}

                                        {
                                            filterJobs.length <= 0 ? <span>Job not found</span> : (
                        <div className="job">{

                            filterJobs?.map((job) =>(<motion.div  initial={{ opacity: 0, x: 100 }}
                                                 animate={{ opacity: 1, x: 0 }}
                                                 exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.4 }} key={job?._id}> <Job job={job} /></motion.div>))}
                        </div>)
                } 

                                        
                {/* {
                    allJobs.length <= 0 ? <span>Job not found</span> : (
                        <div className="job">{

                            allJobs?.map((job) =>(<div key={job?._id}> <Job job={job} /></div>))}
                        </div>)
                } */}
            </div>

        </div>
    </>
    )
}

export default Jobs