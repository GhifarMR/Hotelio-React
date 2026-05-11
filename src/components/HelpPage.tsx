import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "./ui/card";

const HelpPage: React.FC = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 mt-10 md:min-h-screen">
        <div className="">
          <h1 className="text-4xl font-bold mb-6 hover:bg-red-950 hover:text-white p-2 inline-block transition">
            Do you need Help?
          </h1>

          <Card className="p-5">
            <form action="" className="flex flex-col gap-3">
              <label htmlFor="" className="text-xl">
                Email:
              </label>
              <Input
                type="email"
                required
                placeholder="Enter your email here"
              />{" "}
              <br />
              <label htmlFor="" className="text-xl">
                Subject:
              </label>
              <Select>
                <SelectTrigger className="w-full max-w-4xl">
                  <SelectValue placeholder="Select a problem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Problem</SelectLabel>
                    <SelectItem value="apple">Payment & Refund</SelectItem>
                    <SelectItem value="banana">Booking Cancellation</SelectItem>
                    <SelectItem value="blueberry">
                      Check In / Check Out Issue
                    </SelectItem>
                    <SelectItem value="grapes">Account & Security</SelectItem>
                    <SelectItem value="pineapple">
                      Feedback & Suggestion
                    </SelectItem>
                    <SelectItem value="pineapple">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <label htmlFor="" className="text-xl">
                Message:
              </label>
              <Textarea
                name=""
                id=""
                required
                placeholder="Add your message here"
                className="p min-w-75 min-h-50"
              />{" "}
              <br />
              <div className="flex justify-center">
                <Input
                  type="submit"
                  value="Submit"
                  className="border-2 cursor-pointer rounded-lg "
                />
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpPage;
