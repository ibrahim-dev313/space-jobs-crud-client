import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="min-h-screen hero bg-base-200">
                <div className="text-center hero-content">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>

                        <div className="flex items-center justify-between gap-6 p-0 rounded-full input">

                            <input type="text" placeholder="Search Jobs" className="w-full max-w-xs rounded-full input input-ghost" />

                            <button className="p-0 m-0 btn btn-circle"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#00040a", }} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;