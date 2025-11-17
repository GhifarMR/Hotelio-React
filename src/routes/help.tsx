import HelpPage from '@/components/HelpPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/help')({
  component: HelpPage,
})
