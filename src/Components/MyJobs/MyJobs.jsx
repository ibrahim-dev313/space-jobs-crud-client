import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
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
    const jobData = useLoaderData();
    const { user } = useContext(AuthContext);
    const [myjobs, setMyJobs] = useState(jobData)

    const userJobs = myjobs.filter((job) => job.postedByEmail === user.email);

    const handleDeleteJob = (_id) => {

        axios.delete(`http://localhost:4000/job/${_id}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        const updatedMyJobs = myjobs.filter(job => job._id !== _id);
        setMyJobs(updatedMyJobs);


    };

    return (
        <div className="overflow-x-auto">
            <table className="table">
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
                                <Link to={`/my-jobs/${job._id}`} className="btn btn-circle">
                                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                                </Link>
                                <button onClick={() => handleDeleteJob(job._id)} className="btn btn-circle">
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyJobs;
