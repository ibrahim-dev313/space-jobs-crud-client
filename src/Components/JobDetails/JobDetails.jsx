import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const JobDetails = () => {
    const jobData = useLoaderData()
    console.log(jobData);
    const { user } = useContext(AuthContext)
    // const [jobData, setJobData] = useState(null);

    const [resumeLink, setResumeLink] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);



    const openModal = () => {
        if (jobData && jobData.postedByEmail == user.email) {

            toast.error("Employer of this job cannot apply.")
            return;
        }

        if (jobData && new Date(jobData.applicationDeadline) < Date.now()) {
            return;
        }

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const submitApplication = () => {
        // Save the application to your MongoDB collection here.

        setIsModalOpen(false);
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
                        <p>Number of Applicants: {jobData.applicants}</p>
                        <p>Application Deadline: {jobData.applicationDeadline}</p>
                        <button onClick={openModal} className="mt-4 btn btn-block btn-accent">Apply</button>
                    </div>
                </div>
            )}

            {/* Modal */}
            <dialog id="my_modal_1" className="modal" open={isModalOpen}>
                <div className="modal-box">
                    <h3 className="text-lg font-bold text-center">Apply for Job</h3>
                    <form method="dialog" className="flex flex-col">
                        <input label="Name" className="my-2 input input-bordered" value={user?.displayName} />
                        <input label="Email" className="my-2 input input-bordered" value={user.email} disabled />
                        <input
                            className="my-2 input input-bordered bg-base-100"
                            label="Resume Link"
                            placeholder="Resume Link"
                            value={resumeLink}
                            onChange={(e) => setResumeLink(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-3 my-3">
                            <button className="btn" onClick={submitApplication}>Submit Application</button>
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
            <Toaster />
        </div>
    );
};

export default JobDetails;
