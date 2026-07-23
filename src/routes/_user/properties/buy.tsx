import { createFileRoute } from '@tanstack/react-router'
import PropertiesPage from '#/features/properties/components/PropertiesPage'
import { propertySearchSchema } from '#/features/properties/types/filterSchema'

export const Route = createFileRoute('/_user/properties/buy')({
  validateSearch: (search) => propertySearchSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  return <PropertiesPage purpose="buy" />
}
