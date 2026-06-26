import PropertyDetailPage from '#/features/properties/components/PropertyDetailPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/properties/$id')({
  component: PropertyDetailPage,
})
