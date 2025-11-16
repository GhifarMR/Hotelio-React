import React from 'react';
import { Link } from "@tanstack/react-router";

interface NavItemProps {
  item: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ item, to }) => (
  <Link
    to={to}
    className="relative cursor-pointer active:text-purple-950
    after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-purple-950
    after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
  >
    {item}
  </Link>
);

export default NavItem;