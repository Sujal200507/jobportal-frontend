import React, { useState, useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Bookmark } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const LatestJobCard = ({job}) => {
    const [isSaved, setIsSaved] = useState(false);
    const { authUser } = useSelector(store => store.auth);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 3600));
    }

    // Check if job is saved on component mount
    useEffect(() => {
        if (authUser?._id) {
            const savedJobsData = localStorage.getItem(`savedJobs_${authUser._id}`);
            if (savedJobsData) {
                const savedJobIds = JSON.parse(savedJobsData);
                setIsSaved(savedJobIds.includes(job._id));
            }
        }
    }, [job._id, authUser?._id]);

    const handleSaveJob = (e) => {
        e.stopPropagation();
        if (!authUser) {
            toast.error("Please login to save jobs");
            return;
        }

        const savedJobsData = localStorage.getItem(`savedJobs_${authUser._id}`);
        let savedJobIds = savedJobsData ? JSON.parse(savedJobsData) : [];

        if (isSaved) {
            // Remove from saved jobs
            savedJobIds = savedJobIds.filter(id => id !== job._id);
            toast.success("Job removed from saved jobs");
        } else {
            // Add to saved jobs
            savedJobIds.push(job._id);
            toast.success("Job saved successfully");
        }

        localStorage.setItem(`savedJobs_${authUser._id}`, JSON.stringify(savedJobIds));
        setIsSaved(!isSaved);
    }

    return (
        <div className='p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer h-[420px] sm:h-[380px] flex flex-col'>
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button 
                    size="icon" 
                    className={`rounded-full transition-all duration-200 ${isSaved ? 'bg-[#F83002] text-white hover:bg-[#d42a02]' : 'hover:bg-gray-100'}`}
                    variant="secondary"
                    onClick={handleSaveJob}
                >
                    <Bookmark className={isSaved ? 'fill-current' : ''} />
                </Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button size='icon' variant="outline" className="p-4 sm:p-6">
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
                <Button variant="outline" className="rounded-lg flex-1">Details</Button>
                <Button 
                    className={`rounded-lg flex-1 transition-all duration-200 ${isSaved ? 'bg-[#F83002] hover:bg-[#d42a02]' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                    onClick={handleSaveJob}
                >
                    {isSaved ? 'Unsave' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default LatestJobCard