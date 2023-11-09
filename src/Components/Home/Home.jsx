import { pageTitle } from '../../Functions/DynamicTitle';
import Banner from './Banner';
import CareerAdvice from './CareerAdvice';
import JobAlertSubscription from './JobAlertSubscription';
import JobTabs from './JobTabs';

const Home = () => {
    pageTitle("Home")
    return (
        <div>
            <Banner />
            <JobTabs />
            <CareerAdvice></CareerAdvice>
            <JobAlertSubscription></JobAlertSubscription>
        </div>
    );
};

export default Home;