import axios from "axios";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { pageTitle } from "../../Functions/DynamicTitle";
import { AuthContext } from "../../Providers/AuthProvider";

const JobDetails = () => {
    pageTitle("Job Details")

    const jobData = useLoaderData()
    // console.log(jobData._id);
    const [updatedJob, setUpdatedJob] = useState(jobData)

    const { user } = useContext(AuthContext)
    // const [jobData, setJobData] = useState(null);
    const updateJobData = async () => {
        try {
            const response = await axios.get(`https://spacejobs-mi1357.vercel.app/job/${jobData._id}`);
            setUpdatedJob(response.data);
            setIsModalOpen(false)
        } catch (error) {
            console.error("Error updating job list:", error);
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        if (jobData && jobData.postedByEmail == user.email) {

            toast.error("Employer of this job cannot apply.")
            return;
        }

        if (jobData && new Date(jobData.applicationDeadline) < Date.now()) {
            toast.error('Deadline Over')
            return;
        }

        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitApplication = async (e) => {
        e.preventDefault()
        const form = e.target
        const appliedData = {
            applicantName: form.applicantName.value,
            applicantEmail: form.applicantEmail.value,
            applicantResumeLink: form.applicantResumeLink.value,
            appliedJob: jobData.jobTitle,
            appliedCompany: jobData?.company,
            appliedCategory: jobData.jobCategory
        }
        console.log(appliedData);

        try {
            const response = await axios.post("https://spacejobs-mi1357.vercel.app/applied-job", appliedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            toast.success('Application Submitted')
            // const incrementValue = 1;
            axios.patch(`https://spacejobs-mi1357.vercel.app/job/${jobData._id}`, { increment: 1 })
                .then((response) => {
                    // Handle success
                    console.log(response.data);
                    updateJobData()
                })
                .catch((error) => {
                    // Handle error
                    console.error(error);
                });

        } catch (error) {
            console.log(error);
            toast.error("error")
        }

        //setIsModalOpen(false);
    };

    return (
        <div>
            {updatedJob && (
                <div className="m-5 bg-white rounded-xl">
                    <img src={updatedJob.pictureURL} alt="Company Logo" className="w-full rounded-t-lg  h-96" />
                    <div className="p-4">
                        <h1 className="mb-2 text-3xl font-bold">{updatedJob.jobTitle}</h1>
                        <p>{updatedJob.description}</p>
                        <p>Salary Range: {updatedJob.salaryRange}</p>
                        <p>Number of Applicants: {updatedJob.jobApplicants}</p>
                        <p>Application Deadline: {updatedJob.applicationDeadline}</p>
                        <button onClick={openModal} className="mt-4 btn btn-block btn-accent">Apply</button>
                    </div>
                </div>
            )}

            {/* Modal */}
            <dialog id="my_modal_1" className="modal" open={isModalOpen}>
                <div className="modal-box">
                    <h3 className="text-lg font-bold text-center">Apply for Job</h3>
                    <form onSubmit={submitApplication} method="dialog" className="flex flex-col">
                        <input label="Name" className="my-2 input input-bordered" name="applicantName" defaultValue={user?.displayName} />
                        <input label="Email" name="applicantEmail" className="my-2 input input-bordered" defaultValue={user.email} disabled />
                        <input
                            className="my-2 input input-bordered bg-base-100"
                            label="Resume Link"
                            placeholder="Resume Link"

                            name="applicantResumeLink"
                            required
                        />
                        <div className="grid grid-cols-2 gap-3 my-3">
                            <button className="btn" type="submit">Submit Application</button>
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </form>
                </div>
                <Toaster />
            </dialog>
            <Toaster></Toaster>
        </div>
    );
};

export default JobDetails;
