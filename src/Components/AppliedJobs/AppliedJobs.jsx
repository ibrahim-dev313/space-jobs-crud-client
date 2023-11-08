import { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const AppliedJobs = () => {
    const appliedJobsData = useLoaderData();
    const { user } = useContext(AuthContext);
    const [searchValue, setSearchValue] = useState('');

    const myAppliedJobs = appliedJobsData.filter((myjob) => myjob.applicantEmail === user.email);
    const [filteredJobs, setFilteredJobs] = useState(myAppliedJobs);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchValue(searchValue);
        const filteredJobs = myAppliedJobs.filter((job) =>
            job.appliedCategory.toLowerCase().includes(searchValue)
        );
        setFilteredJobs(filteredJobs);
    };

    return (
        <div className="overflow-x-auto">
            <form className="flex items-center justify-between p-0 m-5 rounded-full input input-bordered">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by Job Title"
                    className="w-full rounded-full h-2/3 input input-ghost"
                    onChange={handleSearch}
                    value={searchValue}
                />
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center">Job Title</th>
                        <th className="text-center">Company</th>
                        <th className="text-center">Job Category</th>
                        <th className="text-center">Resume Link</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs.map((job) => (
                        <tr key={job._id}>
                            <td className="text-center">{job.appliedJob}</td>
                            <td className="text-center">{job.appliedCompany}</td>
                            <td className="text-center">{job.appliedCategory}</td>
                            <td className="text-center">
                                <a className='underline text-primary underline-offset-4' href={job.applicantResumeLink}>
                                    Resume Link
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobs;
