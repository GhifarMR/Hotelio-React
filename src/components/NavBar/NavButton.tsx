import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  to: string;
  children: string;
  variant?: "default" | "outline";
  className?: string;
  onClick?: () => void;
}

const NavButton = ({
  to,
  children,
  variant = "default",
  className,
  onClick,
}: NavButtonProps) => (
  <Button asChild variant={variant} className={cn(className)} onClick={onClick}>
    <Link to={to}>{children}</Link>
  </Button>
);

export default NavButton;