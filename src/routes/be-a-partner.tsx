import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/be-a-partner')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/be-a-partner"!</div>
}
