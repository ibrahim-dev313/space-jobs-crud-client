import { useContext, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import generatePDF from 'react-to-pdf';
import { pageTitle } from '../../Functions/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProvider';

const AppliedJobs = () => {
    pageTitle("Applied Jobs")

    const appliedJobsData = useLoaderData();
    const { user } = useContext(AuthContext);
    const [searchValue, setSearchValue] = useState('');
    const targetRef = useRef();

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
        <div className="my-6 overflow-x-auto">
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
            <h1 className='my-8 text-2xl font-bold text-center'>Applied Jobs</h1>

            <table className="table" ref={targetRef}>
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
            <div className='flex justify-center'>
                <button className=' btn' onClick={() => generatePDF(targetRef, { filename: 'job-application-sumary.pdf' })}>Download Summary</button>
                <div className='hidden'>
                    Content to be included in the PDF
                </div>
            </div>
        </div>
    );
};

export default AppliedJobs;
