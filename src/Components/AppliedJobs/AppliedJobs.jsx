import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const AppliedJobs = () => {
    const appliedJobsData = useLoaderData();
    const { user } = useContext(AuthContext);

    const myAppliedJobs = appliedJobsData.filter((myjob) => myjob.applicantEmail === user.email);

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center">Job Title</th>
                        <th className="text-center">Company</th>
                        <th className="text-center">Resume Link</th>
                    </tr>
                </thead>
                <tbody>
                    {myAppliedJobs.map((job) => (
                        <tr key={job._id}>
                            <td className="text-center">{job.appliedJob}</td>
                            <td className="text-center">{job.appliedCompany}</td>
                            <td className="text-center">
                                <a className='underline text-primary underline-offset-4' href={job.applicantResumeLink} >
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
