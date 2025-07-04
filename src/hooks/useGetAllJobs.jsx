import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                console.log("Fetching jobs...");
                axios.defaults.withCredentials = true;
                const res = await axios.get(`https://portal-x2e7.onrender.com/api/v1/job/all`);
               
                console.log("Jobs response:", res.data);
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                    console.log("Jobs dispatched:", res.data.jobs);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        }
        fetchJobs();
    }, [dispatch])
}
export default useGetAllJobs;