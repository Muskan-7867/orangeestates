import { useParams } from "@tanstack/react-router";
import { properties } from "#/constants";

import PropertyGallery from "./PropertyGallery";
import PropertyDetails from "./PropertyDetails";

export default function PropertyDetailPage() {
  const { id } = useParams({ from: "/_user/properties/$id" });

  // Find property by id
  const property = properties.find((p) => p.id === id) || properties[0];




  return (
    <main className="min-h-screen bg-bg pb-24 mt-18">

      <PropertyGallery property={property} />


      {/* Property Details Layout */}
      <PropertyDetails property={property} />
    </main>
  );
}
