import { createFileRoute } from '@tanstack/react-router'
import PropertiesPage from '#/features/properties/components/PropertiesPage'
import { propertySearchSchema } from '#/features/properties/types/filterSchema'
import { getProperties } from '#/features/properties/server/properties.fn'

export const Route = createFileRoute('/_user/properties/')({
  validateSearch: propertySearchSchema,
  
  loaderDeps: ({ search: { purpose } }) => ({
    purpose
  }),
  loader: ({ deps: { purpose } }) => {
    const properties = getProperties({ data: { purpose } });
    return properties;
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <PropertiesPage />
}
