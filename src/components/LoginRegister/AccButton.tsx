interface AccBtnProps {
    text: string;
}

const AccButton = ({text}: AccBtnProps) => {
  return (
    <button
      type="submit"
      className="bg-black text-white py-3 rounded-xl hover:opacity-90 mt-2 cursor-pointer"
    >
      {text}
    </button>
  );
};

export default AccButton;
