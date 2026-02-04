import Navbar from "./Navbar"

const BeAPartner = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16 mt-10">
        
        <h1 className="text-4xl font-bold mb-4">
          Partner with us and grow your hotel business
        </h1>
        <p className="text-gray-600 mb-10">
          List your property on our platform and reach thousands of travelers.
          Simple setup, real bookings, and full control over your rooms.
        </p>

        {/* BENEFITS */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <div className="border rounded-xl p-5">
            <h3 className="font-semibold mb-2">More Exposure</h3>
            <p className="text-sm text-gray-600">
              Get discovered by travelers looking for places to stay.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="font-semibold mb-2">Easy Management</h3>
            <p className="text-sm text-gray-600">
              Manage rooms, prices, and bookings from one dashboard.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="font-semibold mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              Receive payments safely and on time.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="border rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Register your property
          </h2>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                required
                placeholder="hotel@example.com"
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Hotel name</label>
              <input
                type="text"
                required
                placeholder="Your hotel name"
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">City</label>
              <input
                type="text"
                required
                placeholder="City location"
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Tell us about your property
              </label>
              <textarea
                placeholder="Number of rooms, facilities, etc."
                className="border rounded-lg px-3 py-2 w-full min-h-[120px]"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white rounded-lg py-3 mt-2 hover:bg-gray-900"
            >
              Become a Partner
            </button>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default BeAPartner
