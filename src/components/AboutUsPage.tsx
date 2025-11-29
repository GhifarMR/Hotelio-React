import Navbar from "./Navbar";

const AboutUsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-16 mt-3">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Welcome to <span className="font-semibold">Skyline Hotel</span>, 
                    a modern and comfortable place designed to provide the perfect stay for travelers, 
                    families, and business guests. Our hotel combines warm hospitality with 
                    exceptional service to create a memorable experience for every visitor.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Located in a strategic and peaceful area, Skyline Hotel offers easy access 
                    to popular destinations, dining spots, and essential city facilities. 
                    With elegant rooms, friendly staff, and complete amenities, we ensure that 
                    our guests enjoy comfort from the moment they arrive.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    From relaxing stays to business needs, we are committed to delivering 
                    an environment where guests can rest, recharge, and feel at home. 
                    Your comfort and satisfaction are our top priorities.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                    Our Vision
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    To become one of the most trusted, comfortable, and welcoming hotels 
                    that provides exceptional hospitality experiences for guests from all around the world.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">
                    Our Mission
                </h2>
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                    <li>Provide excellent service with professionalism and care.</li>
                    <li>Deliver clean, safe, and well-maintained facilities for all guests.</li>
                    <li>Offer a comfortable environment for both leisure and business needs.</li>
                    <li>Continuously improve our services to meet guest expectations.</li>
                </ul>
            </div>
        </div>
    )
}

export default AboutUsPage;
