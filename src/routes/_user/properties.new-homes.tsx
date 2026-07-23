import { createFileRoute } from '@tanstack/react-router'
import PropertiesPage from '#/features/properties/components/PropertiesPage'

export const Route = createFileRoute('/_user/properties/new-homes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PropertiesPage purpose="new-homes" />
}
