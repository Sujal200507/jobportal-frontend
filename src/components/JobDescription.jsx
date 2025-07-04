import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { setSingleJobById } from '@/redux/jobSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, DollarSign, Users, Building, Clock, Award } from 'lucide-react';

const JobDescription = () => {
  const { singleJobById } = useSelector(store => store.job);
  const { authUser } = useSelector(store => store.auth);
  const navigate = useNavigate();

  const isInitiallyApplied = singleJobById?.applications?.some(application => application.applicant === authUser?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const dispatch = useDispatch();
  const params = useParams();

  const applyJobHandler = async () => {
    if (!authUser) {
      toast.error("Please login to apply for this job");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(`https://portal-x2e7.onrender.com/api/v1/application/apply/${params.id}`);
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = { ...singleJobById, applications: [...singleJobById.applications, { applicant: authUser._id }] };
        dispatch(setSingleJobById(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`https://portal-x2e7.onrender.com/api/v1/job/${params.id}`);
        if (res.data.success) {
          dispatch(setSingleJobById(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === authUser?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [params.id, dispatch, authUser?._id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto px-2 sm:px-4">
        {/* Back Button */}
        <Button 
          onClick={() => navigate(-1)} 
          variant="ghost" 
          className="mb-4 sm:mb-6 flex items-center gap-2 hover:bg-gray-200 text-sm sm:text-base"
        >
          <ArrowLeft size={20} />
          Go Back
        </Button>

        {/* Main Square Card with Colorful Border */}
        <div className="relative">
          {/* Colorful Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-2xl blur-sm opacity-75"></div>
          
          {/* Main Content Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold mb-2">{singleJobById?.title}</h1>
                  <p className="text-base sm:text-lg mb-2">{singleJobById?.company?.name}</p>
                  <div className="flex items-center gap-2 text-base sm:text-lg">
                    <Building size={20} />
                    <span>{singleJobById?.location}</span>
                  </div>
                </div>
                <Button
                  onClick={isApplied ? null : applyJobHandler}
                  disabled={isApplied}
                  className={`rounded-xl px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold ${
                    isApplied 
                      ? "bg-gray-600 cursor-not-allowed" 
                      : "bg-white text-purple-600 hover:bg-gray-100"
                  }`}
                >
                  {isApplied ? "Already Applied" : authUser ? "Apply Now" : "Login to Apply"}
                </Button>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="p-4 sm:p-6">
              {/* Key Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-xl text-center">
                  <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Salary</p>
                  <p className="text-lg font-bold text-blue-600">{singleJobById?.salary} LPA</p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl text-center">
                  <MapPin className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-lg font-bold text-green-600">{singleJobById?.location}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl text-center">
                  <Users className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Positions</p>
                  <p className="text-lg font-bold text-purple-600">{singleJobById?.position}</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-xl text-center">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Job Type</p>
                  <p className="text-lg font-bold text-orange-600">{singleJobById?.jobType}</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 text-xs sm:text-sm">
                  {singleJobById?.experienceLevel}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 font-semibold px-3 py-1 text-xs sm:text-sm">
                  {singleJobById?.applications?.length || 0} Applicants
                </Badge>
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Job Description
                </h2>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{singleJobById?.description}</p>
                </div>
              </div>

              {/* Requirements */}
              {singleJobById?.requirements && singleJobById.requirements.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-bold mb-3">Requirements</h2>
                  <div className="flex flex-wrap gap-2">
                    {singleJobById.requirements.map((req, index) => (
                      <Badge key={index} className="bg-red-100 text-red-700 font-semibold px-2 py-1 text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                <h3 className="text-base font-semibold mb-3">Job Information</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Posted:</span> {formatDate(singleJobById?.createdAt)}</p>
                  <p><span className="font-medium">Experience Level:</span> {singleJobById?.experienceLevel}</p>
                  <p><span className="font-medium">Total Applications:</span> {singleJobById?.applications?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
