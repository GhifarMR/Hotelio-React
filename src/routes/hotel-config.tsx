import HotelConfig from '@/components/OwnerPage/HotelConfig'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hotel-config')({
  component: HotelConfig,
})
