
import AdminPage from '@/AdminPage/AdminPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin-dashboard')({
  component: AdminPage,
})

