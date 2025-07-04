import React from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import Job from './Job';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);

  console.log("Browse - allJobs:", allJobs);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-6 px-2 sm:px-4'>
        <h1 className='font-bold text-lg sm:text-xl my-6 sm:my-10'>Search Results ({allJobs?.length || 0})</h1>
        <div className='flex-1 h-auto lg:h-[88vh] overflow-y-auto no-scrollbar pb-5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>

            {
              allJobs && allJobs.length > 0 ? allJobs?.map((job) => {
                return (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                )
              }) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10">
                  <p className="text-gray-500">No jobs found</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Browse