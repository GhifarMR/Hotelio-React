import { createFileRoute, redirect } from "@tanstack/react-router";
import BookPage from "@/components/BookPage";
import { getAuth } from "@/lib/auth";

export const Route = createFileRoute("/book")({
  component: BookPage,
  beforeLoad: () => {
    const { token } = getAuth();

    if (!token) {
      const wantsToLogin = confirm("You are not login yet, want to login?");
      if (wantsToLogin) {
        throw redirect({ to: "/login" });
      } else {
        throw redirect({ to: "/explore" });
      }
    }

    // if (role !== "admin") {
    //   throw redirect({ to: "/explore" });
    // }
  },
});
