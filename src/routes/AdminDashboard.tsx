import AdminDashboardPage from '@/components/AdminDashboardPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/AdminDashboard')({
  component: AdminDashboardPage,
})

