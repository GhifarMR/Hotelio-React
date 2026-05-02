import Footer from "./MainDashboard/Footer";
import Navbar from "./Navbar";
import { SignupForm } from "./signup-form";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center p-6">
        <SignupForm className="w-full max-w-5xl" />
      </div>

      <div className="md:hidden">
        <Footer />
      </div>

    </div>
  );
};

export default RegisterPage;