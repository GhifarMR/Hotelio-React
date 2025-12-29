interface button{
  name: string;
}

const DateBox = ({name}: button) => {
  return (
      <div className="flex flex-col flex-1">
        <label className="text-xs text-gray-500 mb-1">{name}</label>
        <input type="date" className="flex-1 border rounded-lg p-3 text-sm" />
      </div>
  );
};

export default DateBox;
