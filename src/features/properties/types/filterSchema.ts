import { z } from 'zod'

export const propertySearchSchema = z.object({
  q: z.string().optional(),
  purpose: z.enum(['all', 'buy', 'rent', 'new-homes']).optional(),
  country: z.string().optional(),
  type: z.string().optional(),
  priceRange: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  beds: z.string().optional(),
  baths: z.string().optional(),
  completion: z.string().optional(),
  developer: z.string().optional(),
  size: z.string().optional(),
  area: z.string().optional(),
  page: z.number().optional(),
})

export type PropertySearchParams = z.infer<typeof propertySearchSchema>
