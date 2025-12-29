interface HeadLineProps {
  title: React.ReactNode;
  description: string;
}


const HeadLine = ({title, description}: HeadLineProps) => {
  return (
    <div>
      <div className="mb-10 max-w-x1 md:hidden">
        <h2 className="text-3xl font-bold mb-3 hover:bg-red-900 hover:text-white" >
          {title}
        </h2>
        <p className="text-gray-600 max-w-md hover:text-black">
          {description}
        </p>
      </div>

      <div className="md:flex justify-between mb-10 max-w-x1 hidden">
        <h2 className="text-4xl font-bold hover:bg-red-900 hover:text-white" >
          {title}
        </h2>
        <p className="text-gray-600 max-w-md hover:text-black">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeadLine;
