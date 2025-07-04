import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const CreateJobs = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        industry: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const { companies } = useSelector(store => store.company);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const handleSelectChange = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`https://portal-x2e7.onrender.com/api/v1/job/postjob`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }); 
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
        setInput({
            title: "",
            description: "",
            requirements: "",
            salary: "",
            location: "",
            industry: "",
            jobType: "",
            experience: "",
            position: 0,
            companyId: ""
        })
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-full my-5 px-2 sm:px-4'>
                <div className='p-4 sm:p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md w-full'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary <span className='text-xs text-gray-500'>(in LPA)</span></Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Industry</Label>
                            <Select onValueChange={(value) => setInput({ ...input, industry: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                                        <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="FullStack Developer">FullStack Developer</SelectItem>
                                        <SelectItem value="Nextjs Developer">Nextjs Developer</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level <span className='text-xs text-gray-500'>(in years)</span></Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type='number'
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length !== 0 && (
                                <Select onValueChange={handleSelectChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies && companies.map((company) => {
                                                    return (
                                                        <SelectItem
                                                            key={company?._id}
                                                            value={company?.name.toLowerCase()}
                                                        >
                                                            {company?.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    <Button type="submit" onClick={submitHandler} className="w-full mt-6 sm:mt-8">Create Job</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateJobs