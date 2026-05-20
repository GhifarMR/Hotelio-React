import AddHotel from '@/components/OwnerPage/AddHotel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/add-hotel')({
  component: AddHotel,
})

