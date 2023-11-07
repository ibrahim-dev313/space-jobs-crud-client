import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const AddJobPage = () => {
    const { user } = useContext(AuthContext)
    useEffect(() => {
        // Fetch user data or populate the list of users here
    }, []);


    const [jobCategory, setJobCategory] = useState("On Site");
    const [jobPostingDate, setJobPostingDate] = useState(new Date());
    const [applicationDeadline, setApplicationDeadline] = useState(new Date());
    const jobApplicants = 0;

    const handleCategoryClick = (category) => {
        setJobCategory(category);
    };

    const isCategoryActive = (category) => jobCategory === category;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const jobData = {
            pictureURL: form.pictureURL.value,
            jobTitle: form.jobTitle.value,
            postedByEmail: user.email,
            postedByName: form.username.value,
            jobCategory,
            salaryRange: form.salaryRange.value,
            jobDescription: form.jobDescription.value,
            jobPostingDate: jobPostingDate,
            applicationDeadline: applicationDeadline,
            jobApplicants,
        };

        // console.log(formattedDate);
        try {
            const response = await axios.post("http://localhost:4000/job", jobData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            toast.success('Job Posted')
        } catch (error) {
            console.log(error);
            toast.error("error")
        }
    };

    return (
        <div className="container p-8 mx-auto my-12 bg-white rounded-lg shadow-lg">
            <h1 className="mb-4 text-3xl font-bold text-center ">Add A Job</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="pictureURL" className="font-medium text-gray-600">
                        Picture URL of the Job Banner:
                    </label>
                    <input
                        type="text"
                        id="pictureURL"
                        name="pictureURL"
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="jobTitle" className="font-medium text-gray-600">
                        Job Title:
                    </label>
                    <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="font-medium text-gray-600">
                        Logged In User Name:
                    </label>
                    <input
                        type="text"
                        id="username"
                        defaultValue={user?.displayName}
                        name="username"
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="font-medium text-gray-600">Job Category:</label>
                    <div className="mt-2 space-x-2">
                        <button
                            type="button"
                            className={`${isCategoryActive("On Site")
                                ? "btn-accent text-white"
                                : "bg-gray-400"
                                } px-6 py-2 text-black font-semibold rounded-md group focus:shadow hover:text-white hover:bg-gray-800`}
                            onClick={() => handleCategoryClick("On Site")}
                        >
                            On Site
                        </button>
                        <button
                            type="button"
                            className={`${isCategoryActive("Remote")
                                ? "btn-accent text-white"
                                : "bg-gray-400"
                                } px-6 py-2 text-black font-semibold rounded-md group focus:shadow hover:text-white hover:bg-gray-800`}
                            onClick={() => handleCategoryClick("Remote")}
                        >
                            Remote
                        </button>
                        <button
                            type="button"
                            className={`${isCategoryActive("Part-Time")
                                ? "btn-accent text-white"
                                : "bg-gray-400"
                                } px-6 py-2 text-black font-semibold rounded-md group focus:shadow hover:text-white hover:bg-gray-800`}
                            onClick={() => handleCategoryClick("Part-Time")}
                        >
                            Part-Time
                        </button>
                        <button
                            type="button"
                            className={`${isCategoryActive("Hybrid")
                                ? "btn-accent text-white"
                                : "bg-gray-400"
                                } px-6 py-2 text-black font-semibold rounded-md group focus:shadow hover:text-white hover:bg-gray-800`}
                            onClick={() => handleCategoryClick("Hybrid")}
                        >
                            Hybrid
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="salaryRange" className="font-medium text-gray-600">
                        Salary Range:
                    </label>
                    <input
                        type="text"
                        id="salaryRange"
                        name="salaryRange"
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="jobDescription" className="font-medium text-gray-600">
                        Job Description:
                    </label>
                    <input
                        type="text"
                        id="jobDescription"
                        name="jobDescription"
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="jobPostingDate" className="font-medium text-gray-600">
                        Job Posting Date:
                    </label>
                    <DatePicker
                        id="jobPostingDate"
                        name="jobPostingDate"
                        dateFormat="dd/MM/yyyy"
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        selected={jobPostingDate}
                        onChange={(date) => setJobPostingDate(date)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="applicationDeadline" className="font-medium text-gray-600">
                        Application Deadline:
                    </label>
                    <DatePicker
                        id="applicationDeadline"
                        dateFormat="dd/MM/yyyy"
                        name="applicationDeadline"
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        selected={applicationDeadline}
                        onChange={(date) => setApplicationDeadline(date)}
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out rounded-md btn-accent group focus:shadow hover:bg-gray-800"
                >
                    Add Job
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-4 transition-all group-hover:ml-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default AddJobPage;
