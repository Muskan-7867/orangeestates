import PropertiesPage from '#/features/properties/components/PropertiesPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/new-homes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PropertiesPage purpose="new-homes" />
}
