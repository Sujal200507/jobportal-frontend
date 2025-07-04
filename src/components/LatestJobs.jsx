import React, { useState } from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    console.log("LatestJobs - allJobs:", allJobs);
    
    return (
        <div className='max-w-7xl mx-auto my-10 px-2 sm:px-4'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold'><span className='text-[#6A38C2]'>Latest and Top</span> Job Openings</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    allJobs && allJobs.length > 0 ? allJobs?.slice(0,6).map(job => (
                        <LatestJobCard key={job._id} job={job}/>
                    )) : (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10">
                            <p className="text-gray-500">No jobs available at the moment</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs