import { Calendar, Receipt, ShieldCheck, CreditCard, User } from "lucide-react";
import Navbar from "./Navbar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


const BookPage: React.FC = () => {
  return (
    <div className="min-h-screen font-sans">
      <div className="sticky top-0">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 my-10">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Booking Contact */}
          <Card>
            <CardHeader>
              <User className="" size={24} />
              <h2 className="text-xl font-bold text-slate-800">
                Booking Contact
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* 2. Guest Details */}
          <Card>
            <CardHeader>
              <CreditCard className="" size={24} />
              <h2 className="text-xl font-bold text-slate-800">Payment</h2>
              <p>All transactions are secure and encrypted</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form>
                  <FieldGroup>
                    <FieldSet>
                      <FieldGroup>
                        <Field>
                          <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                            Name on Card
                          </FieldLabel>
                          <Input
                            id="checkout-7j9-card-name-43j"
                            placeholder="Evil Rabbit"
                            required
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                            Card Number
                          </FieldLabel>
                          <Input
                            id="checkout-7j9-card-number-uw1"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </Field>
                        <div className="grid grid-cols-3 gap-4">
                          <Field>
                            <FieldLabel htmlFor="checkout-exp-month-ts6">
                              Month
                            </FieldLabel>
                            <Select defaultValue="">
                              <SelectTrigger id="checkout-exp-month-ts6">
                                <SelectValue placeholder="MM" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="01">01</SelectItem>
                                  <SelectItem value="02">02</SelectItem>
                                  <SelectItem value="03">03</SelectItem>
                                  <SelectItem value="04">04</SelectItem>
                                  <SelectItem value="05">05</SelectItem>
                                  <SelectItem value="06">06</SelectItem>
                                  <SelectItem value="07">07</SelectItem>
                                  <SelectItem value="08">08</SelectItem>
                                  <SelectItem value="09">09</SelectItem>
                                  <SelectItem value="10">10</SelectItem>
                                  <SelectItem value="11">11</SelectItem>
                                  <SelectItem value="12">12</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                              Year
                            </FieldLabel>
                            <Select defaultValue="">
                              <SelectTrigger id="checkout-7j9-exp-year-f59">
                                <SelectValue placeholder="YYYY" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="2024">2024</SelectItem>
                                  <SelectItem value="2025">2025</SelectItem>
                                  <SelectItem value="2026">2026</SelectItem>
                                  <SelectItem value="2027">2027</SelectItem>
                                  <SelectItem value="2028">2028</SelectItem>
                                  <SelectItem value="2029">2029</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="checkout-7j9-cvv">
                              CVV
                            </FieldLabel>
                            <Input
                              id="checkout-7j9-cvv"
                              placeholder="123"
                              required
                            />
                          </Field>
                        </div>
                      </FieldGroup>
                    </FieldSet>
                  </FieldGroup>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* 3. Accommodation Policies */}
          <Card>
            <CardHeader>
              <ShieldCheck size={24} />
              <h2 className="text-xl font-bold text-slate-800">Policies</h2>
            </CardHeader>
            <CardContent>
              <div>
                <ul className="text-sm space-y-2 list-disc pl-5">
                  <li>Check-in: 2:00 PM | Check-out: 12:00 PM</li>
                  <li>Cancellation: Non-refundable for this rate.</li>
                  <li>No pets allowed.</li>
                  <li>Valid ID is required upon arrival.</li>
                </ul>

                <Field className="mt-4" orientation="horizontal">
                  <Checkbox id="terms-checkbox" name="terms-checkbox" />
                  <Label htmlFor="terms-checkbox">
                    Accept terms and conditions
                  </Label>
                </Field>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Reservation & Price Details */}
        <div className="space-y-6">
          <aside className="bg-white p-6 rounded-2xl shadow-sm border md:min-w-100 border-slate-100 fixed ">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={20} />
              <h2 className="text-lg font-bold">Reservation</h2>
            </div>

            <div className="mb-6 pb-6 border-bottom border-slate-100 border-b">
              <p className="font-bold">Superior King Room</p>
              <p className="text-sm">2 Nights (May 12 - May 14)</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Receipt size={20} />
              <h2 className="text-lg font-bold">Price Details</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Room x 2 Nights</span>
                <span className="font-medium">Rp 1.600.000</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span className="font-medium">Rp 176.000</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-bold">
                <span>Total Price</span>
                <span>Rp 1.776.000</span>
              </div>
            </div>

            <Button className="w-full mt-8 cursor-pointer">
              Complete Booking
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
