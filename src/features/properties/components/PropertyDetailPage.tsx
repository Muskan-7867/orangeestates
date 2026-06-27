import { useParams } from "@tanstack/react-router";
import { properties } from "#/constants";

import PropertyGallery from "./PropertyGallery";
import PropertyDetails from "./PropertyDetails";
import RelatedProperties from "./RelatedProperties";

export default function PropertyDetailPage() {
  const { id } = useParams({ from: "/_user/properties/$id" });

  // Find property by id
  const property = properties.find((p) => p.id === id) || properties[0];

  // Get related properties (excluding current)
  const relatedProperties = properties
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-bg pb-24 mt-18">
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
