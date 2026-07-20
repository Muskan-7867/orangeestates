import { SignupForm } from '#/features/auth/components/signup-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignupForm />
}
