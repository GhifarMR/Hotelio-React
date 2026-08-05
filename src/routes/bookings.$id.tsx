import { createFileRoute, redirect } from "@tanstack/react-router";
import BookingDetailPage from "@/components/BookingDetailPage";

interface BookingDetailSearch {
  status?: string;
}

export const Route = createFileRoute("/bookings/$id")({
  validateSearch: (search: Record<string, unknown>): BookingDetailSearch => ({
    status: search.status as string | undefined,
  }),
  component: BookingDetailPage,
  beforeLoad: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
});