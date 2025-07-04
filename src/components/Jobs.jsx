import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import Footer from './shared/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Jobnotfound from './Jobnotfound'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Jobs = () => {
    useGetAllJobs();
    const { authUser } = useSelector((store) => store.auth);
    const { allJobs } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [localFilter, setLocalFilter] = useState('');
    const navigate = useNavigate();

    console.log("Jobs - allJobs:", allJobs);
    console.log("Jobs - filterJobs:", filterJobs);
    console.log("Jobs - localFilter:", localFilter);

    useEffect(() => {
        if (localFilter) {
            const filteredJobs = allJobs.filter((job) => {
                const filterLower = localFilter.toLowerCase();
                const titleLower = job.title.toLowerCase();
                const descriptionLower = job.description.toLowerCase();
                const locationLower = job?.location?.toLowerCase() || '';
                const industryLower = job?.industry?.toLowerCase() || '';
                const companyNameLower = job?.company?.name?.toLowerCase() || '';

                // Salary filtering logic
                if (filterLower.includes('salary') || filterLower.includes('lakh')) {
                    const jobSalary = job.salary; // This is in lakhs
                    
                    // Convert salary filter to numeric ranges
                    if (filterLower === '0 - 5 lakhs') {
                        // 0 - 5 lakhs
                        return jobSalary >= 0 && jobSalary <= 5;
                    } else if (filterLower === '5 - 10 lakhs') {
                        // 5 - 10 lakhs
                        return jobSalary >= 5 && jobSalary <= 10;
                    } else if (filterLower === '10 - 20 lakhs') {
                        // 10 - 20 lakhs
                        return jobSalary >= 10 && jobSalary <= 20;
                    } else if (filterLower === '20+ lakhs') {
                        // 20+ lakhs
                        return jobSalary >= 20;
                    }
                }

                // Create mapping for filter terms to job titles/descriptions
                const filterMappings = {
                    'data science': ['data scientist', 'data science', 'machine learning', 'ml', 'ai', 'artificial intelligence'],
                    'frontend developer': ['frontend developer', 'frontend', 'react', 'ui developer'],
                    'backend developer': ['backend developer', 'backend', 'node.js', 'api developer'],
                    'fullstack developer': ['fullstack developer', 'fullstack', 'full stack', 'full-stack'],
                    'nextjs developer': ['nextjs developer', 'next.js developer', 'nextjs', 'next.js']
                };

                // For Frontend and Backend Developer, use exact industry match
                if (filterLower === 'frontend developer' || filterLower === 'backend developer') {
                    return industryLower === filterLower;
                }

                // Check if we have a specific mapping for this filter
                if (filterMappings[filterLower]) {
                    return filterMappings[filterLower].some(term => 
                        titleLower.includes(term) || 
                        descriptionLower.includes(term) ||
                        industryLower.includes(term)
                    );
                }

                // General filtering for other cases (location, etc.)
                return titleLower.includes(filterLower) ||
                    descriptionLower.includes(filterLower) ||
                    locationLower.includes(filterLower) ||
                    industryLower.includes(filterLower) ||
                    companyNameLower.includes(filterLower);
            })
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, localFilter]);

    useEffect(() => {
        if (authUser?.role === 'recruiter') {
            navigate("/admin/jobs");
        }
    })

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-2 sm:px-4'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-[20%]'>
                        <FilterCard onFilterChange={setLocalFilter} />
                    </div>
                    {
                        filterJobs && filterJobs.length > 0 ? (
                            <div className='flex-1 h-auto lg:h-[88vh] overflow-y-auto no-scrollbar pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs?.map((job) => (
                                            <motion.div
                                                key={job._id}
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }

                                </div>
                            </div>
                        ) : <Jobnotfound />
                    }

                </div> 
            </div>
        </div>
    )
}

export default Jobs