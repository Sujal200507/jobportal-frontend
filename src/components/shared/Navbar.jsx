import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ProfilePopover } from '../ProfilePopover';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { authUser } = useSelector(store => store.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className='bg-white'>
            <div className='flex flex-wrap items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                <div className="min-w-[120px] flex items-center">
                    <h1 className='text-2xl font-bold hover:scale-105 transition-transform duration-200 cursor-pointer'>
                        Job<span className='ml-1 text-[#F83002] hover:text-[#d42a02] transition-colors duration-200'>Scout</span>
                    </h1>
                </div>
                {/* Hamburger for mobile */}
                <div className="flex items-center md:hidden">
                    <button
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#F83002] focus:outline-none"
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                {/* Desktop nav */}
                <div className='hidden md:flex flex-wrap items-center gap-6 sm:gap-8 md:gap-12'>
                    <ul className='flex flex-wrap font-medium items-center gap-3 sm:gap-5'>
                        {
                            authUser && authUser.role === "recruiter" ? (
                                <>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/admin/companies"}>Companies</Link></li>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/"}>Home</Link></li>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/jobs"}>Jobs</Link></li>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/browse"}>Browse</Link></li>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/saved-jobs"}>Saved Jobs</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !authUser ? (
                            <div className='flex flex-wrap items-center gap-2'>
                                <Link to="/login"><Button variant={'outline'} className="hover:bg-gray-100 hover:scale-105 transition-all duration-200">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5f32ad] hover:scale-105 transition-all duration-200">Signup</Button></Link>
                            </div>
                        ) : (
                            <ProfilePopover />
                        )
                    }
                </div>
            </div>
            {/* Mobile menu dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg px-4 pb-4 z-50 w-full animate-fade-in">
                    <ul className='flex flex-col font-medium items-start gap-3 pt-4'>
                        {
                            authUser && authUser.role === "recruiter" ? (
                                <>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/admin/companies"} onClick={()=>setMenuOpen(false)}>Companies</Link></li>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/admin/jobs"} onClick={()=>setMenuOpen(false)}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/"} onClick={()=>setMenuOpen(false)}>Home</Link></li>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/jobs"} onClick={()=>setMenuOpen(false)}>Jobs</Link></li>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/browse"} onClick={()=>setMenuOpen(false)}>Browse</Link></li>
                                    <li className='hover:text-[#6A38C2] hover:scale-105 transition-all duration-200 cursor-pointer'><Link to={"/saved-jobs"} onClick={()=>setMenuOpen(false)}>Saved Jobs</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !authUser ? (
                            <div className='flex flex-col items-start gap-2 pt-4'>
                                <Link to="/login" onClick={()=>setMenuOpen(false)}><Button variant={'outline'} className="hover:bg-gray-100 hover:scale-105 transition-all duration-200 w-full">Login</Button></Link>
                                <Link to="/signup" onClick={()=>setMenuOpen(false)}><Button className="bg-[#6A38C2] hover:bg-[#5f32ad] hover:scale-105 transition-all duration-200 w-full">Signup</Button></Link>
                            </div>
                        ) : (
                            <div className='pt-4'><ProfilePopover /></div>
                        )
                    }
                </div>
            )}
            <div className='h-0.5 bg-[#F83002]'></div>
        </div>
    )
}

export default Navbar