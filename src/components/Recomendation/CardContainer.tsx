interface CardContainerProps {
  name: string;
  location: string;
  img: string;
  ratingStars: string;
  ratingNumbers: string;
}

const CardContainer = ({name, location, img, ratingStars, ratingNumbers}: CardContainerProps) => {
  return (   
    <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300">
        <div className="overflow-hidden rounded-t-2xl">
            <a href="#">
                <img
                    src={img}
                    alt={name}
                    className="w-full h-[220px] rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </a>
        </div>

        <div className="p-4">
            <a href="#">
                <h3 className="text-2xl font-semibold hover:bg-yellow-300 inline-block">
                {name}
                </h3>
            </a>
            <a href="#">
                <p className="text-lg text-gray-500">{location}</p>
            </a>
            <a href="#">
                <div className="text-lg mt-1">
                <span className="text-yellow-400 mr-2">{ratingStars}</span>
                {ratingNumbers}
                </div>
            </a>
            <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 mt-4">
                <a
                    href="#"
                    className="inline-block border border-black bg-white text-black text-sm px-4 py-2 rounded-full md:hover:bg-black md:hover:text-white transition md:active:bg-purple-950"
                >
                Book Now
                </a>
            </div>
        </div>
    </div>
  )
};

export default CardContainer;
