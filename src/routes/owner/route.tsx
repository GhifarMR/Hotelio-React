import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/owner")({
  beforeLoad: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      throw redirect({ to: "/login" });
    }
    if (role !== "owner") {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Outlet />,
});

