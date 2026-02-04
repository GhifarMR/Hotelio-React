interface content {
  children: React.ReactNode;
}

const SubTitleAbout = ({ children }: content) => {
  return (
    <h2 className="text-2xl font-semibold inline-block hover:bg-red-950 hover:text-white text-gray-800 mt-12 mb-4">
      {children}
    </h2>
  );
};

export default SubTitleAbout;
