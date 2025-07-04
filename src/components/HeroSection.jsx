import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = () => {
        dispatch(setSearchText(query));
        navigate("/browse");
    }

    return (
        <div className='text-center px-2 sm:px-4'>
            <div className='flex flex-col gap-5 my-8 sm:my-10'>
                <div className='text-center mx-auto'>
                    <div className="text-[#F83002] px-4 py-2 rounded-full bg-gray-100 font-medium text-sm sm:text-base" >No. 1 Job Hunt Website</div>
                </div>
                <div>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>Search, Apply & <br className="hidden sm:block" /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                </div>
                <div>
                    <p className='text-gray-500 text-sm sm:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus adipisci cupiditate cum.<br className="hidden sm:block" /> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className='flex w-full max-w-lg shadow-lg border pl-3 border-gray-200 rounded-full items-center gap-2 sm:gap-4 mx-auto'>
                    <input
                        type="text"
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find your dream jobs"
                        className="outline-none border-none w-full text-sm sm:text-base px-2 py-2 bg-transparent"
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2] px-3 sm:px-5'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection