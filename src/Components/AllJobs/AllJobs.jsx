import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { pageTitle } from "../../Functions/DynamicTitle";

const AllJobs = () => {
    pageTitle("All Jobs")

    const jobsData = useLoaderData();
    console.log(jobsData);
    const [filteredJobs, setFilteredJobs] = useState(jobsData);

    const handleSearch = (e) => {
        e.preventDefault()
        const searchValue = e.target.search.value
        console.log(searchValue);
        const searchedJobs = jobsData.filter((job) =>
            job.jobTitle.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredJobs(searchedJobs);
        console.log(searchedJobs);
    };


    return (
        <div className="overflow-x-auto">
            <form onSubmit={handleSearch} className="flex items-center justify-between p-0 m-5 rounded-full input input-bordered">

                <input
                    type="text"
                    name="search"
                    placeholder="Search by Job Title"
                    className="w-full rounded-full h-2/3 input input-ghost" />

                <button type="submit" className="p-0 m-0 btn btn-circle"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#00040a", }} /></button>
            </form>
            <table className="table">
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Job Title</th>
                        <th>Job Posting Date</th>
                        <th>Application Deadline</th>
                        <th>Salary Range</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs.map((job) => (
                        <tr key={job.id}>

                            <td>
                                {job.postedByName}
                            </td>
                            <td>{job.jobTitle}</td>
                            <td>{job.jobPostingDate}</td>
                            <td>{job.applicationDeadline}</td>
                            <td>{job.salaryRange}</td>
                            <th>
                                <Link to={`/job/${job._id}`} className="btn btn-ghost btn-xs">
                                    Details
                                </Link>
                            </th>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default AllJobs;
