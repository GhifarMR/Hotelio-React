import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";

const HelpPage: React.FC = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16 mt-3">
        <div className="">
          <h1 className="text-4xl font-bold mb-6">Do you need Help? </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-2xl">Email:</label> <br />
            <input type="email" placeholder="Enter your email here" className="border-2 rounded-lg py-2 px-2 min-w-[300px]" /> <br />

            <label htmlFor="" className="text-2xl">Subject:</label> <br />
            <select name="" id="" className="border-2 px-2 py-2 rounded-lg">
              <option value="">Choose a subject</option>
              <option value="">Payment Error</option>
              <option value="">Hotel Out of Service</option>
              <option value="">Scammed</option>
            </select> <br />

            <label htmlFor="" className="text-2xl">Message:</label> <br />
            <textarea name="" id="" placeholder="Add your message here" className="border-2 rounded-lg py-1 px-2 min-w-[300px] min-h-[200px]"></textarea> <br />

            <input type="submit" className="border-2 border-black bg-black text-white cursor-pointer rounded-lg py-2 px-3 "/>

          </div>
          
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default HelpPage;
