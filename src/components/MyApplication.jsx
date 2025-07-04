import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import ApplicationTable from './ApplicationTable';

const totalAppliedJob = [1, 2, 3, 4, 5];

const MyApplication = () => {
    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto px-2 sm:px-4'>
                <h1 className='font-bold my-5 text-lg sm:text-xl'>Total Applied Jobs</h1>
                <ApplicationTable />
            </div>
        </>
    )
}

export default MyApplication