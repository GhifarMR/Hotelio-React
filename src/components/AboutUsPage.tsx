import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Hotel, Globe, ShieldCheck } from "lucide-react";

const H = () => (
  <span className="font-semibold text-gray-950 hover:bg-blue-950 hover:text-white px-0.5 transition">
    HOTELIO
  </span>
);

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

    <h1 className="text-4xl flex justify-center p-5">About Us</h1>
      {/* About Text */}
      <div className="max-w-3xl mx-auto p-4 space-y-5 text-gray-600 leading-relaxed">
        
        <p>
          Welcome to <H />, a modern hotel booking platform designed to help users find and book
          hotels easily, quickly, and securely. <H /> was created to simplify the hotel reservation
          process by providing all essential features in one convenient and user-friendly website.
        </p>
        <p>
          Through <H />, users can explore a wide range of hotel options, compare prices, and view
          detailed information before making a reservation. <H /> supports travelers in planning
          their trips, whether for vacations, business travel, or short stays.
        </p>
        <p>
          One of the main advantages of <H /> is its interactive and intuitive interface. By
          focusing on interactivity and clarity, <H /> ensures a smooth and enjoyable experience
          for every user.
        </p>
        <p>
          User comfort is a top priority at <H />. The website is fully responsive and optimized
          for various devices. By continuously improving features and design, <H /> aims to become
          a reliable companion for modern travelers.
        </p>
      </div>

      <Separator className="max-w-3xl mx-auto" />

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { value: "10,000+", label: "Hotels Listed" },
          { value: "50,000+", label: "Happy Guests" },
          { value: "120+", label: "Cities Covered" },
          { value: "4.8 ★", label: "Average Rating" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-gray-950">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <Separator className="max-w-3xl mx-auto" />

      {/* Vision & Mission */}
      <div className="max-w-4xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        <Card className="border-2 shadow-none text-gray-950 rounded-2xl">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="text-gray-950 leading-relaxed text-sm">
              To become a trusted and innovative hotel booking platform that prioritizes user
              comfort, simplicity, and reliability in every reservation experience.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-200 shadow-none rounded-2xl">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-950">Our Mission</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Provide an easy, fast, and secure booking process.",
                "Develop an interactive and user-friendly platform.",
                "Ensure comfort with a responsive, well-structured website.",
                "Present clear, accurate, and complete hotel information.",
                "Continuously improve based on user needs.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-950 mb-10">
            Why Choose <H />?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Hotel size={28} />,
                title: "Wide Selection",
                desc: "Thousands of hotels across hundreds of cities worldwide.",
              },
              {
                icon: <Globe size={28} />,
                title: "Best Price",
                desc: "We compare prices so you always get the best deal available.",
              },
              {
                icon: <ShieldCheck size={28} />,
                title: "Secure Booking",
                desc: "Your data and transactions are always protected.",
              },
            ].map((item) => (
              <Card key={item.title} className="rounded-2xl border border-gray-200 shadow-none hover:shadow-md transition">
                <CardContent className="p-6 space-y-3">
                  <div className="text-gray-950">{item.icon}</div>
                  <h3 className="font-semibold text-gray-950">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;