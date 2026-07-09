import { useParams } from "@tanstack/react-router";
import { properties } from "#/constants";

import PropertyGallery from "./PropertyGallery";
import PropertyDetails from "./PropertyDetails";
import RelatedProperties from "./RelatedProperties";

export default function PropertyDetailPage() {
  const { slug } = useParams({ from: "/_user/properties/$slug" });

  // Find property by slug
  const property = properties.find((p) => p.slug === slug) || properties[0];

  // Get related properties (excluding current)
  const relatedProperties = properties
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-bg pb-24 pt-24 ">
      <PropertyGallery property={property} />

      {/* Property Details Layout */}
      <PropertyDetails property={property} />

      {/* Related Properties Section */}
      {relatedProperties.length > 0 && (
        <RelatedProperties relatedProperties={relatedProperties} />
      )}
    </main>
  );
}
