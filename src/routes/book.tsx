import { createFileRoute } from '@tanstack/react-router'
import BookPage from '@/components/BookPage'


export const Route = createFileRoute('/book')({
  component: BookPage,
})

