
const CareerAdvice = () => {
    return (
        <div className="pt-12 pb-24 bg-base-300 rounded-xl">
            <div className="container px-4 mx-auto">
                <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Career Advice and Tips</h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Career Advice Card 1 */}
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg card">
                        <img src="https://img.freepik.com/free-photo/closeup-candidate-giving-his-cv-while-applying-job-office_637285-6571.jpg?w=1800&t=st=1699442872~exp=1699443472~hmac=e71d39687cc967c6d1c2b4c475aa873310817fcd6f900a7d1ba881f1ecb8ebc6" alt="Career Advice 1" className="object-cover w-full h-48" />
                        <div className="p-4">
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">Resume Writing Tips</h3>
                            <p className="text-gray-600">Learn how to create a standout resume that grabs employers attention.</p>
                        </div>
                    </div>

                    {/* Career Advice Card 2 */}
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                        <img src="https://img.freepik.com/free-photo/conducting-negotiations-boardroom_1098-13855.jpg?w=1800&t=st=1699442925~exp=1699443525~hmac=bd63e7e86b41fb39ed5ef91b24dcbbc96fae1927d526305e744e88602758a956" alt="Career Advice 2" className="object-cover w-full h-48" />
                        <div className="p-4">
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">Mastering Interviews</h3>
                            <p className="text-gray-600">Discover interview techniques and strategies to ace your job interviews.</p>
                        </div>
                    </div>

                    {/* Career Advice Card 3 */}
                    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                        <img src="https://img.freepik.com/free-vector/job-promotion-concept-illustration_114360-19315.jpg?w=1800&t=st=1699443040~exp=1699443640~hmac=333dc09fd2b578468976f971ac9c30c2aff867cd434073f625642e46ec840913" alt="Career Advice 3" className="object-cover w-full h-48" />
                        <div className="p-4">
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">Career Growth Tips</h3>
                            <p className="text-gray-600">Explore ways to advance your career and achieve your professional goals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareerAdvice;
