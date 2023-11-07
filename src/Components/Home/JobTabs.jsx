import { Link, useLoaderData } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const JobTabs = () => {
    const jobData = useLoaderData()
    const categories = ['All Jobs', 'On Site', 'Remote', 'Part-Time', 'Hybrid'];

    const categoryJobs = {};
    const formatDateTime = (dateTimeString) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        return new Date(dateTimeString).toLocaleString(undefined, options);
    };
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleString(undefined, options);
    };
    // Categorize jobs based on jobCategory
    categories.forEach(category => {
        if (category === 'All Jobs') {
            categoryJobs[category] = jobData;
        } else {
            categoryJobs[category] = jobData.filter(job => job.jobCategory === category);
        }
    });

    return (
        <div>
            <Tabs className='p-5 bg-base-100'>
                <TabList className='flex flex-row items-center justify-center'>
                    {categories.map(category => (
                        <Tab key={category}>{category}</Tab>
                    ))}
                </TabList>

                {categories.map(category => (
                    <TabPanel key={category}>
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
                                {categoryJobs[category].map(job => (
                                    <tr key={job._id}>
                                        <td>{job.postedByName}</td>
                                        <td>{job.jobTitle}</td>
                                        <td>{formatDate(job.jobPostingDate)}</td>
                                        <td>{formatDateTime(job.applicationDeadline)}</td>
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
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default JobTabs;
