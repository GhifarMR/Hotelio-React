import SearchBox from "./SearchBox/SearchBox";

const Book = () => {
  return (
    <div className="my-10 grid justify-center">
      
      <div className="flex justify-center">
        <SearchBox />
      </div>

      <form action="">
        {/* Card Lead Guess */}
        <div className="p-5 border-1 rounded-lg">
          <h1 className="text-2xl mb-4">Lead Guess</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              required
              placeholder="First name"
              className="p-2 min-w-[300px] border-2  rounded-lg"
            />
            <input
              type="text"
              required
              placeholder="Last name"
              className="p-2 min-w-[300px] border-2  rounded-lg"
            />
            <input
              type="text"
              required
              placeholder="Email"
              className="p-2 min-w-[300px] border-2  rounded-lg"
            />
            <input
              type="text"
              placeholder="Phone number (optional)"
              className="p-2 min-w-[300px] border-2  rounded-lg"
            />
          </div>
        </div>

        {/* Card Information */}

        <div className="p-5 mt-5 border-1 rounded-lg">
          <h1 className="text-2xl mb-4">Information</h1>
          
          <div className="text-xl border-1 rounded-lg p-4 mb-3">
            <h1>Great Ghifar Hotel</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border-1 rounded-lg p-4">
              <p>Check In</p>
              <p className="text-xl">Sat, 20 May 2024</p>
              <p>12.00 pm</p>
            </div>

            <div className="border-1 rounded-lg p-4">
              <p>Check Out</p>
              <p className="text-xl">Sat, 24 May 2024</p>
              <p>12.00 pm</p>
            </div>

            <h1>2 People | 4 days</h1>
          </div>
        </div>

        {/* Card Message */}
        <div className="p-5 mt-5 border-1 rounded-lg">
          <h1 className="text-2xl mb-4">Message (optional) </h1>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <textarea name="" id="" className="p-4 border-2 rounded-lg text-xl min-h-[300px]" placeholder="Leave a message here">
            </textarea>
          </div>
        </div>

        <input
          type="submit"
          value="Payment"
          className="border-2 border-black bg-black py-2 px-4 rounded-lg text-white text-2xl align-center mt-5 cursor-pointer active:bg-blue-950"
        />
      </form>
    </div>
  );
};

export default Book;
