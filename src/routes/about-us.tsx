import AboutUsPage from '@/components/AboutUsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about-us')({
  component: AboutUsPage,
})

