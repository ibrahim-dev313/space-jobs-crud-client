import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const MyJobs = () => {
    const { jobData } = useLoaderData();
    const { user } = useContext(AuthContext);

    const userJobs = jobData.filter((job) => job.postedByEmail === user.email);

    const handleDeleteJob = (jobId) => {
        // Implement the delete job action. Ask for confirmation and delete the job.
    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Job Title</th>
                        <th>Job Posting Date</th>
                        <th>Application Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userJobs.map((job) => (
                        <tr key={job._id}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>{job.jobTitle}</td>
                            <td>{job.jobPostingDate}</td>
                            <td>{job.applicationDeadline}</td>
                            <th>
                                <Link to={`/my-jobs/${job._id}`} className="btn btn-ghost btn-xs">
                                    Update
                                </Link>
                                <button
                                    onClick={() => handleDeleteJob(job._id)}
                                    className="btn btn-error btn-xs"
                                >
                                    Delete
                                </button>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyJobs;
