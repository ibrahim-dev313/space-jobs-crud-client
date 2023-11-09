import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the styles
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { pageTitle } from "../../Functions/DynamicTitle";
import { AuthContext } from "../../Providers/AuthProvider";


const formatDateTime = (dateTimeString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    return new Date(dateTimeString).toLocaleString(undefined, options);
};
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleString(undefined, options);
};

const MyJobs = () => {
    pageTitle("My Jobs")

    const jobData = useLoaderData();
    const { user } = useContext(AuthContext);
    const [myjobs, setMyJobs] = useState(jobData)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobCategory, setJobCategory] = useState("On Site");
    const [jobPostingDate, setJobPostingDate] = useState(new Date());
    const [singlejob, setsinglejob] = useState({})
    const [newApplicationDeadline, setApplicationDeadline] = useState(new Date());


    const userJobs = myjobs.filter((job) => job.postedByEmail === user.email);

    const handleDeleteJob = (_id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this job?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`https://spacejobs-mi1357.vercel.app/job/${_id}`)
                            .then((response) => {
                                console.log(response.data);
                                toast.success('Job Deleted Successfully')
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        const updatedMyJobs = myjobs.filter(job => job._id !== _id);
                        setMyJobs(updatedMyJobs);
                    }
                },
                {
                    label: 'No',
                    onClick: () => { } // Do nothing if the user clicks "No"
                }
            ]
        });
    };
    const updateJobList = async () => {
        try {
            const response = await axios.get("https://spacejobs-mi1357.vercel.app/jobs");
            setMyJobs(response.data);
        } catch (error) {
            console.error("Error updating job list:", error);
        }
    };

    const handleOpenModal = (job) => {
        setIsModalOpen(true);
        console.log(job);
        setsinglejob(job)
        handleCategoryClick(job.jobCategory)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const jobApplicants = 0;

    const handleCategoryClick = (category) => {
        setJobCategory(category);
    };

    const isCategoryActive = (category) => jobCategory === category;
    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;
        const updatedJobData = {
            pictureURL: form.pictureURL.value,
            jobTitle: form.jobTitle.value,
            postedByEmail: user.email,
            postedByName: form.username.value,
            jobCategory,
            company: form.company.value,
            salaryRange: form.salaryRange.value,
            jobDescription: form.jobDescription.value,
            jobPostingDate: jobPostingDate,
            newApplicationDeadline: newApplicationDeadline,
            jobApplicants,
        };

        try {
            const response = await axios.put(`https://spacejobs-mi1357.vercel.app/job/${singlejob._id}`, updatedJobData);
            console.log(response.data.modifiedCount);
            if (response.data.modifiedCount != 0) {
                toast.success('Job Updated Successfully')
                updateJobList()
                handleCloseModal()
            }
        } catch (error) {
            console.error("Error updating job:", error);
            // Handle the error, e.g., show an error message
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table ">
                <thead>
                    <tr>
                        <th className="text-center">Job Title</th>
                        <th className="text-center">Job Posting Date</th>
                        <th className="text-center">Application Deadline</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userJobs.map((job) => (
                        <tr key={job._id}>
                            <td className="text-center">{job.jobTitle}</td>
                            <td className="text-center">{formatDate(job.jobPostingDate)}</td>
                            <td className="text-center">
                                {formatDateTime(job.applicationDeadline)}

                            </td>
                            <td className="flex items-center justify-center gap-1">
                                <button onClick={() => handleOpenModal(job)} className="btn btn-circle">
                                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                                </button>
                                <button onClick={() => handleDeleteJob(job._id)} className="btn btn-circle">
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal */}
            {isModalOpen && (
                <dialog id="my_modal_1" className="modal" open>


                    <form className="relative border-8 bg-base-300 border-amber-100 modal-box backdrop-blur-3xl" onSubmit={handleUpdate}>

                        <div className="mb-4">
                            <label htmlFor="pictureURL" className="font-medium text-gray-600">
                                Picture URL of the Job Banner:
                            </label>
                            <input
                                type="text"
                                id="pictureURL"
                                defaultValue={singlejob.pictureURL}
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
                                defaultValue={singlejob.jobTitle}
                                name="jobTitle"
                                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="companyName" className="font-medium text-gray-600">
                                Company Logo URL:
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                defaultValue={singlejob.company}
                                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="font-medium text-gray-600">
                                Job Posted By:
                            </label>
                            <input
                                type="text"
                                id="username"
                                defaultValue={singlejob.postedByName}
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
                                defaultValue={singlejob.salaryRange}
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
                                defaultValue={singlejob.jobDescription}
                                name="jobDescription"
                                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="jobPostingDate" className="font-medium text-gray-600">
                                Job Posting Date:
                            </label>
                            <DatePicker
                                id="jobPostingDate"
                                name="jobPostingDate"
                                dateFormat="dd/MM/yyyy"
                                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                selected={new Date(singlejob.jobPostingDate)}
                                onChange={(date) => setJobPostingDate(date)}
                                disabled
                            />

                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="applicationDeadline" className="font-medium text-gray-600">
                                Application Deadline:
                            </label>

                            <DatePicker
                                id="applicationDeadline"
                                dateFormat="dd/MM/yyyy"
                                name="applicationDeadline"
                                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                disabled
                                selected={new Date(singlejob.applicationDeadline)}
                                onChange={(date) => setApplicationDeadline(date)}
                            />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <label htmlFor="applicationDeadline" className="font-medium text-gray-600">
                                New Application Deadline:
                            </label>

                            <DatePicker
                                id="newApplicationDeadline"
                                dateFormat="dd/MM/yyyy"
                                name="newApplicationDeadline"
                                className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                selected={newApplicationDeadline}
                                onChange={(date) => setApplicationDeadline(date)}
                            />
                        </div>

                        <div className="flex gap-1">
                            <div className="inline-flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out rounded-xl btn-warning group focus:shadow hover:bg-gray-800" onClick={handleCloseModal}>
                                Close
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out rounded-xl btn-accent group focus:shadow hover:bg-gray-800"
                            >
                                Update Job
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ml-4 transition-all group-hover:ml-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </form>

                </dialog>
            )}
        </div>
    );
};

export default MyJobs;
