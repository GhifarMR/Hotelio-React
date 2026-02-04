import AdminDashboardPageEdit from '@/components/AdminDashboardPageEdit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin-dashboard-edit')({
  component: AdminDashboardPageEdit,
})

