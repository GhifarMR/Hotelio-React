interface BigCardsProps {
  name: string;
  location: string;
  img: string;
  ratingStars: string;
  ratingNumbers: string;
}

const BigCards = ({name, location, img, ratingStars, ratingNumbers}: BigCardsProps) => {
  return (
    <a
        href="#"
        className="relative col-span-2 rounded-xl overflow-hidden group h-auto w-auto"
    >
        <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
            <h3 className="text-xl font-bold hover:bg-yellow-300 hover:text-black">{name}</h3>
            <span className="block text-sm">{location}</span>
            <div className="text-sm"><span className="text-yellow-400">{ratingStars}</span> {ratingNumbers}</div>
        </div>
    </a>
);
};

export default BigCards;
