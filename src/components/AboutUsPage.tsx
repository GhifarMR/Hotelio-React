import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import DescriptionAbout from "./AboutUs/DescriptionAbout";
import SubTitleAbout from "./AboutUs/SubTitleAbout";

const AboutUsPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-16 mt-3">
                <h1 className="text-4xl font-bold mb-6 inline-block hover:bg-red-950 hover:text-white py-2 px-1">About Us</h1>

                <DescriptionAbout>
                    Welcome to <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span>, 
                    a modern hotel booking platform designed to help users find and book 
                    hotels easily, quickly, and securely. <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span> was created to simplify 
                    the hotel reservation process by providing all essential features 
                    in one convenient and user-friendly website.
                </DescriptionAbout>

                <DescriptionAbout>
                    Through <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span>, users can explore 
                    a wide range of hotel options, compare prices, and view detailed 
                    information before making a reservation. <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span> supports travelers in 
                    planning their trips, whether for vacations, business travel, 
                    or short stays, by offering reliable and accessible booking services.
                </DescriptionAbout>

                <DescriptionAbout>
                    One of the main advantages of <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span> is its interactive and intuitive interface. 
                    The platform is designed to be easy to navigate, allowing users 
                    to complete bookings without confusion. 
                    By focusing on interactivity and clarity, <span className="font-semibold hover:bg-blue-950 hover:text-white"> HOTELIO</span> ensures a smooth and 
                    enjoyable experience for every user.
                </DescriptionAbout>

                <DescriptionAbout>
                    User comfort is a top priority at <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span>. 
                    The website is fully responsive and optimized for various devices, 
                    ensuring consistent performance and usability. 
                    From browsing hotels to confirming reservations, <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span> is committed to delivering 
                    a sense of comfort, trust, and convenience throughout the entire process.
                </DescriptionAbout>

                <DescriptionAbout>
                    By continuously improving features and design, <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span> aims to become a reliable 
                    companion for travelers who seek a seamless and modern hotel booking experience.
                </DescriptionAbout>

                <SubTitleAbout>
                    Our Vision
                </SubTitleAbout>
                
                <DescriptionAbout>
                    To become a trusted and innovative hotel booking platform 
                    that prioritizes user comfort, simplicity, and reliability 
                    in every reservation experience.
                </DescriptionAbout>

                <SubTitleAbout>
                    Our Mission
                </SubTitleAbout>

                <ul className="list-disc pl-6 text-lg space-y-3">
                    <li>
                        To provide an easy, fast, and secure hotel booking process 
                        for users through <span className="font-semibold hover:bg-blue-950 hover:text-white">HOTELIO</span>.
                    </li>
                    <li>
                        To develop an interactive and user-friendly platform 
                        that enhances user engagement and satisfaction.
                    </li>
                    <li>
                        To ensure user comfort by delivering a responsive, 
                        well-structured, and visually pleasing website.
                    </li>
                    <li>
                        To present clear, accurate, and complete hotel information 
                        to help users make confident booking decisions.
                    </li>
                    <li>
                        To continuously improve services and features based on 
                        user needs and technological advancements.
                    </li>
                </ul>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUsPage;
