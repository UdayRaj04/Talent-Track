
import { APPLICATION_API_END_POINT } from '../apis/constant.js';
import { setAllAppliedJobs } from '../redux/jobSlice';
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAplliedJobs = ()=>{
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAplliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/user`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAplliedJobs();
    },[])
} 
export default useGetAplliedJobs;
