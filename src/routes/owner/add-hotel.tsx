import AddHotel from '@/components/OwnerPage/AddHotel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/add-hotel')({
  component: AddHotel,
})

