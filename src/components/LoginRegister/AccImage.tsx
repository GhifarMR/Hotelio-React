interface AccImageProps {
    src: string;
    alt: string;
    text: string;
    subText: string;
}

const AccImage = ({src, alt, text, subText}: AccImageProps) => {
  return (
    <div className="relative h-80 md:h-auto">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-2xl font-bold">{text}</h2>
        <p className="opacity-90 text-sm"> {subText} </p>
      </div>
    </div>
  );
};

export default AccImage;
