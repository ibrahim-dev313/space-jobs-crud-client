import axios from "axios";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const JobDetails = () => {
    const jobData = useLoaderData()
    console.log(jobData.jobCategory);

    const { user } = useContext(AuthContext)
    // const [jobData, setJobData] = useState(null);

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
            const response = await axios.post("http://localhost:4000/applied-job", appliedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            toast.success('Application Submitted')
        } catch (error) {
            console.log(error);
            toast.error("error")
        }

        //setIsModalOpen(false);
    };

    return (
        <div>
            {jobData && (
                <div className="m-5 bg-white rounded-xl">
                    <img src={jobData.pictureURL} alt="Company Logo" className="object-cover w-full h-64 rounded-t-lg" />
                    <div className="p-4">
                        <h1 className="mb-2 text-3xl font-bold">{jobData.jobTitle}</h1>
                        <p>{jobData.description}</p>
                        <p>Salary Range: {jobData.salaryRange}</p>
                        <p>Number of Applicants: {jobData.jobApplicants}</p>
                        <p>Application Deadline: {jobData.applicationDeadline}</p>
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
