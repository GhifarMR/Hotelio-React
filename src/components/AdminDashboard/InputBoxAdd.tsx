import type React from "react";

interface content {
    children: React.ReactNode
    type: string;
}

const InputBoxAdd = ({children, type} : content) => {
  return (
    <div>
      <label className="font-medium">{children}</label>
      <input
        type={type}
        placeholder={`Input ${children}`}
        className="w-full border rounded-lg px-3 py-2 mt-1"
      />
    </div>
  );
};

export default InputBoxAdd;
