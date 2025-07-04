import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const SavedJobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const { authUser } = useSelector(store => store.auth);
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get saved jobs from localStorage
    const savedJobsData = localStorage.getItem(`savedJobs_${authUser?._id}`);
    if (savedJobsData) {
      const savedJobIds = JSON.parse(savedJobsData);
      const filteredJobs = allJobs.filter(job => savedJobIds.includes(job._id));
      setSavedJobs(filteredJobs);
    }
  }, [allJobs, authUser?._id]);

  const handleUnsaveJob = (jobId) => {
    const savedJobsData = localStorage.getItem(`savedJobs_${authUser._id}`);
    let savedJobIds = savedJobsData ? JSON.parse(savedJobsData) : [];
    
    // Remove job from saved jobs
    savedJobIds = savedJobIds.filter(id => id !== jobId);
    localStorage.setItem(`savedJobs_${authUser._id}`, JSON.stringify(savedJobIds));
    
    // Update local state
    setSavedJobs(prev => prev.filter(job => job._id !== jobId));
    
    toast.success("Job removed from saved jobs");
  };

  const handleCardClick = (e, jobId) => {
    // Prevent navigation if clicking on buttons
    if (e.target.closest('button')) {
      return;
    }
    navigate(`/description/${jobId}`);
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDifference = currentDate - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 3600));
  };

  console.log("SavedJobs - savedJobs:", savedJobs);

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5 px-2 sm:px-4'>
        <div className='mb-6'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>Saved Jobs</h1>
          <p className='text-gray-600 mt-2 text-sm sm:text-base'>Your bookmarked job opportunities ({savedJobs.length})</p>
        </div>
        
        {savedJobs && savedJobs.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {savedJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className='p-5 rounded-md shadow-xl bg-white border border-gray-100 h-[380px] flex flex-col cursor-pointer hover:shadow-2xl transition-shadow duration-200'
                  onClick={(e) => handleCardClick(e, job._id)}
                >
                  <div className='flex items-center justify-between'>
                    <p className='text-xs sm:text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                    <Button 
                      size="icon" 
                      className="rounded-full bg-[#F83002] text-white hover:bg-[#d42a02] transition-all duration-200"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnsaveJob(job._id);
                      }}
                    >
                      <Bookmark className="fill-current" />
                    </Button>
                  </div>
                  <div className='flex items-center gap-2 my-2'>
                    <Button size='icon' variant="outline" className="p-6">
                      <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                      </Avatar>
                    </Button>
                    <div>
                      <h1 className='font-medium text-base sm:text-lg'>{job?.company?.name}</h1>
                      <p className='text-xs sm:text-sm text-gray-500'>{job?.location}</p>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h1 className='font-bold text-base sm:text-lg my-2'>{job?.title}</h1>
                    <p className='text-xs sm:text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
                  </div>
                  <div className='flex flex-wrap items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold text-xs sm:text-sm'} variant={'ghost'}>{job?.position} Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold text-xs sm:text-sm'} variant={'ghost'}>{job?.jobType}</Badge>
                    <Badge className={'text-[#7209b7] font-bold text-xs sm:text-sm'} variant={'ghost'}>{job?.salary}LPA</Badge>
                  </div>
                  <div className='flex flex-col sm:flex-row items-stretch gap-2 mt-4'>
                    <Button 
                      variant="outline" 
                      className="rounded-lg flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job._id}`);
                      }}
                    >
                      Details
                    </Button>
                    <Button 
                      className="bg-[#F83002] hover:bg-[#d42a02] rounded-lg flex-1 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnsaveJob(job._id);
                      }}
                    >
                      Unsave
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No saved jobs yet</h2>
            <p className="text-gray-500 text-xs sm:text-base">Start saving jobs you're interested in by clicking the bookmark icon or "Save For Later" button.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedJobs 