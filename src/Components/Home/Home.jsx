import { Toaster } from 'react-hot-toast';
import Banner from './Banner';
import CareerAdvice from './CareerAdvice';
import JobAlertSubscription from './JobAlertSubscription';
import JobTabs from './JobTabs';

const Home = () => {
    return (
        <div>
            <Banner />
            <JobTabs />
            <CareerAdvice></CareerAdvice>
            <JobAlertSubscription></JobAlertSubscription>
            <Toaster />
        </div>
    );
};

export default Home;