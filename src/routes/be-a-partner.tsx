import { createFileRoute } from '@tanstack/react-router'
import BeAPartner from '@/components/BeAPartnerPage'

export const Route = createFileRoute('/be-a-partner')({
  component: BeAPartner,
})

