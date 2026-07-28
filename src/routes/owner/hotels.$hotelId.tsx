import HotelConfig from '@/components/OwnerPage/HotelConfig'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/hotels/$hotelId')({
  component: HotelConfig,
})
