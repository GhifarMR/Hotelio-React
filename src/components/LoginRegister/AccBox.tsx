interface AccProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccBox = ({ label, type, placeholder, value, onChange }: AccProps) => {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100 focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default AccBox;
