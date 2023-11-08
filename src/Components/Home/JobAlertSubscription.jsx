import React from 'react';

const JobAlertSubscription = () => {
    return (
        <div>
            <div className="max-w-6xl px-4 py-10 mx-auto sm:px-6 lg:px-8 lg:py-16">
                <div className="max-w-xl mx-auto text-center">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold md:text-3xl md:leading-tight dark:text-white">Subscribe to Job Alerts</h2>
                    </div>

                    <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                        Get inspired and motivated with daily job opportunities delivered to your inbox. Stay updated and take the next step towards your dream career.
                    </p>

                    <form>
                        <div className="flex flex-col items-center gap-2 mt-5 lg:mt-8 sm:flex-row sm:gap-3">
                            <div className="grid w-full">
                                <input type="text" placeholder="Enter your Email Address" className="w-full input input-error" />
                            </div>
                            <button className="font-bold btn btn-error" type="submit">
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobAlertSubscription;
