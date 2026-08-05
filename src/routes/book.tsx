// routes/book.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import BookPage from "@/components/BookPage";

interface BookSearch {
  hotelId?: string;
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
}

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>): BookSearch => ({
    hotelId: search.hotelId as string | undefined,
    roomId: search.roomId as string | undefined,
    checkIn: search.checkIn as string | undefined,
    checkOut: search.checkOut as string | undefined,
  }),
  component: BookPage,
  // Ambil `search` langsung dari parameter beforeLoad
  beforeLoad: ({ search }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Ambil hotelId dari search params
    const hotelId = search.hotelId;

    if (!token) {
      const choose = confirm("You are not logged in, redirect to login page?");
      if (choose) {
        throw redirect({ to: "/login" });
      } else {
        // Redirect kembali ke halaman detail hotel jika hotelId tersedia
        if (hotelId) {
          throw redirect({
            to: "/hotels/$id",
            params: { id: hotelId },
          });
        }
        
        // Fallback jika hotelId tidak ada di search params
        throw redirect({ to: "/" });
      }
    }

    if (role !== "customer") {
      throw redirect({ to: "/" });
    }
  },
});