import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Banner = () => {
    return (
        <div>
            <div className="min-h-[50vh] hero bg-base-200">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Welcome to Your Dream Career Journey</h1>
                        <p className="py-6">
                            Explore countless opportunities and uncover your path to success. Your dream job is just a click away.
                            Let's embark on this exciting adventure together!
                        </p>

                        <div className="flex items-center justify-between p-0 m-5 rounded-full input input-bordered">
                            <input
                                type="text"
                                placeholder="Search for Jobs"
                                className="w-full rounded-full full h-2/3 input input-ghost"
                            />

                            <button className="p-0 m-0 btn btn-circle">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#00040a" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
