import OwnerPage from '@/components/OwnerPage/OwnerPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/')({
  component: OwnerPage,
  
})


