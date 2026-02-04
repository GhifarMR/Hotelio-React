
import AdminDashboardPageAdd from '@/components/AdminDashboardPageAdd'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin-dashboard-add')({
  component: AdminDashboardPageAdd,
})
