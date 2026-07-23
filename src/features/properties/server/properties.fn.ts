import { properties } from "#/constants";
import { createServerFn } from "@tanstack/react-start";
import { propertySearchSchema } from "#/features/properties/types/filterSchema";

export const getProperties = createServerFn()
.validator(propertySearchSchema)
.handler( 
    async ({ data }) => {

        const purpose = data?.purpose ?? "all";
        console.log("purpose ----", purpose);
        const res = purpose === "all" ? properties : properties.filter((p) => p.purpose === purpose);
        return res;
    }
)
export const getPropertiesBySlug = createServerFn({ method: "GET" })
  .validator((data: string | { slug: string }) => data)
  .handler(async ({ data }) => {
    const slug = typeof data === "string" ? data : data?.slug;
    const property = properties.find((p) => p.slug === slug);
    return property || null;
  });


