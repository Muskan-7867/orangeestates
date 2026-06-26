
import Specifications from "./PropertySpecification";
import PropertyHeaderDesc from "./PropertyHeaderDesc";
import PropertyLocation from "./PropertyLocation";
import PropertyInquiryForm from "./PropertyInquiryForm";

export default function PropertyDetails({ property }: { property: any }) {



    return (
        <section className="w-full px-24 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Content (Left / Middle) */}
            <div className="lg:col-span-2 space-y-4">

                {/* Header & Specs */}
                <PropertyHeaderDesc property={property} />

                <Specifications />

            </div>

            {/* Sidebar Controls (Right Sidebar) - Sticky container for both Agent Inquiry & Map */}
            <div className="space-y-4 lg:col-span-1 sticky top-24 self-start" id="contact-agent">

                {/* Location & Map Card (Sidebar Edition) */}
                <PropertyLocation property={property} />

                {/* Agent Contact Box */}

                <PropertyInquiryForm property={property} />

            </div>
        </section>
    )
}