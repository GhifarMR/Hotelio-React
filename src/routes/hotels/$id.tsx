import OrderPage from "@/components/OrderPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hotels/$id")({
  component: OrderPage,
});
