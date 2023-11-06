// import logo from '../../../assets/logo.svg';

const Footer = () => {
    return (
        <>
            <footer className="p-10 rounded footer footer-center bg-base-200 text-base-content">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <img src={'logo'} alt="" />
                    </div>
                </nav>
                <aside>
                    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </>
    );
};

export default Footer;