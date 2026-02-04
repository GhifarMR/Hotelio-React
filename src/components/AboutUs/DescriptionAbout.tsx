interface content {
  children: React.ReactNode;
}

const DescriptionAbout = ({ children }: content) => {
  return (
    <div>
      <p className="text-lg leading-relaxed mb-6">{children}</p>
    </div>
  );
};

export default DescriptionAbout;
