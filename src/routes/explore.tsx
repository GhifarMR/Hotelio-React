// routes/explore.tsx
import { createFileRoute } from "@tanstack/react-router";
import ExplorePage from "@/components/ExplorePage";

interface ExploreSearch {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  rooms?: number;
}

export const Route = createFileRoute("/explore")({
  validateSearch: (search: Record<string, unknown>): ExploreSearch => ({
    location: search.location as string | undefined,
    checkIn: search.checkIn as string | undefined,
    checkOut: search.checkOut as string | undefined,
    guests: search.guests ? Number(search.guests) : undefined,
    rooms: search.rooms ? Number(search.rooms) : undefined,
  }),
  component: ExplorePage,
});