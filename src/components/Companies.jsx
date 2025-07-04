import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useGetCompanies from '@/hooks/useGetCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetCompanies();
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(text));
    },[text]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-6 px-2 sm:px-4'>
                <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between my-5 gap-2 sm:gap-0'>
                    <Input value={text} onChange={(e) => setText(e.target.value)} className="w-full sm:w-fit" placeholder="Filter by name" />
                    <Button onClick={() => navigate("/admin/companies/create")} className="w-full sm:w-auto mt-2 sm:mt-0">New Company</Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies