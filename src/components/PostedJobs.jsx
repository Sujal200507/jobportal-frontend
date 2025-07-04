import React, { useEffect, useState } from 'react'
import JobTable from './JobTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import Navbar from './shared/Navbar';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchAdminJobs } from '@/redux/jobSlice';

function PostedJobs() {
    useGetAllAdminJobs();
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchAdminJobs(text));
    }, [text])
    
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-6 px-2 sm:px-4'>
                <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between my-5 gap-2 sm:gap-0'>
                    <Input value={text} onChange={(e) => setText(e.target.value)} className="w-full sm:w-[30%]" placeholder="Filter by company name & role" />
                    <Button onClick={() => navigate("/admin/jobs/create") } className="w-full sm:w-auto mt-2 sm:mt-0">New Jobs</Button>
                </div>
                <JobTable />
            </div>
        </div>
    )
}

export default PostedJobs
