import { createFileRoute } from '@tanstack/react-router'
import PropertyDetailPage from '#/features/properties/components/singlepropertypage/PropertyDetailPage'
import { getPropertiesBySlug } from '#/features/properties/server/properties.fn'

export const Route = createFileRoute('/_user/properties/$slug')({
  loader: ({ params }) => getPropertiesBySlug({ data: params.slug }),
  component: PropertyDetailPage,
})

