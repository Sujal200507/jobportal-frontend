import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Contact, Mail, Pen } from 'lucide-react'
import ApplicationTable from './ApplicationTable'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import { UpdateProfileDialog } from './UpdateProfileDialog'
import { useNavigate } from 'react-router-dom'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { Label } from './ui/label'
import { Input } from './ui/input'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { authUser } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const resume = true;
    // protect route
    useEffect(() => {
        if (!authUser) {
            navigate("/");
        }
    }, []);


    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-8'>
                <div className='flex flex-col sm:flex-row justify-between gap-4 sm:gap-0'>
                    <div className='flex flex-col sm:flex-row items-center gap-4'>
                        <Avatar className="h-20 w-20 sm:h-24 sm:w-24" >
                            <AvatarImage src = {authUser?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div className='text-center sm:text-left'>
                            <h1 className='font-medium text-lg sm:text-xl'>{authUser?.fullname}</h1>
                            <p className='text-sm sm:text-base'>{`${authUser?.profile?.bio ? authUser?.profile?.bio : 'Add your bio here'}`}</p>
                        </div>
                    </div>
                    <div className='flex justify-end mt-2 sm:mt-0'>
                        <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
                    </div>
                </div>
                <div className='my-5'>
                    <div className='flex flex-col sm:flex-row items-center gap-3 my-2'>
                        <Mail className='h-4 w-4' />
                        <span className='text-sm sm:text-base'>{authUser?.email}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-3 my-2'>
                        <Contact className='h-4 w-4' />
                        <span className='text-sm sm:text-base'>{authUser?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1 className='my-2 font-bold text-base sm:text-lg text-center sm:text-left'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-1 justify-center sm:justify-start'>
                        {
                            authUser?.profile?.skills.length !== 0 ? authUser?.profile?.skills?.map((skill, index) => <Badge key={index} className='text-xs sm:text-sm'>{skill}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto sm:mx-0 text-center sm:text-left">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        authUser?.profile?.resume ? (
                            <div>
                                <a 
                                    target='_blank' 
                                    rel="noopener noreferrer"
                                    href={authUser?.profile?.resume} 
                                    className='w-full text-blue-500 hover:underline cursor-pointer text-xs sm:text-base'
                                    onClick={(e) => {
                                        console.log("Resume URL:", authUser?.profile?.resume);
                                        const link = document.createElement('a');
                                        link.href = authUser?.profile?.resume;
                                        link.download = authUser?.profile?.resumeOriginalName || 'resume.pdf';
                                        link.target = '_blank';
                                        setTimeout(() => {
                                            if (window.open(authUser?.profile?.resume, '_blank') === null) {
                                                link.click();
                                            }
                                        }, 100);
                                    }}
                                >
                                    {authUser?.profile?.resumeOriginalName}
                                </a>
                                <p className="text-xs text-gray-500 mt-1">Click to open resume (will download if browser can't display)</p>
                            </div>
                        ) : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl mt-4'>
                <h1 className='text-lg sm:text-xl font-bold p-4 sm:p-5'>Applied Jobs</h1>
                <ApplicationTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile