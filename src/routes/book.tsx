// routes/book.tsx
import { createFileRoute } from "@tanstack/react-router";
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
});