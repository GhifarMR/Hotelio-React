import { Link } from "@tanstack/react-router";

interface SmallCardsProps {
id: string;
name: string;
location: string;
img: string;
ratingStars: string;
ratingNumbers: string;
}

const SmallCards = ({
id,
name,
location,
img,
ratingStars,
ratingNumbers,
}: SmallCardsProps) => {
return (
<Link
to="/hotels/$id"
params={{ id: String(id) }}
className="relative rounded-xl overflow-hidden group h-[238px] w-full block"
>
<img
src={img}
alt={name}
className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
<div className="absolute bottom-3 left-3 text-white drop-shadow-lg">
<h3 className="text-lg font-bold hover:bg-yellow-300 hover:text-black">
{name}
</h3>
<span className="block text-sm">{location}</span>
<div className=" text-xs">
<span className="text-yellow-400">{ratingStars}</span> {ratingNumbers}
</div>
</div>
</Link>
  );
};

export default SmallCards;