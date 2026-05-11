import { Link } from '@tanstack/react-router';
import React from 'react';

interface NavButtonProps {
  item?: string;
  to: string;
  className?: string;
  children?: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ to, className, children }) => (
  <Link
    to={to}
    className={`border border-gray-950 rounded-[12px] cursor-pointer md:hover:bg-black md:hover:text-white md:active:bg-purple-950 active:text-white active:bg-black transition ${className}`}
  >
    {children}
  </Link>
);

export default NavButton;