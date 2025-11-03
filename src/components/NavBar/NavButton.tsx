import React from 'react';

interface NavButtonProps {
  children: React.ReactNode;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ children, className }) => (
  <button className={`border-2 border-gray-950 rounded-[10px] cursor-pointer md:hover:bg-black md:hover:text-white md:active:bg-purple-950 active:text-white active:bg-black transition ${className || ''}`}>
    {children}
  </button>
);

export default NavButton;