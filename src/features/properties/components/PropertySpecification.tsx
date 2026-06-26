import { CheckCircle } from "lucide-react";

export default function Specifications(){
    return (
          <div className="bg-white p-6 sm:p-8 border border-gray-100 ">
            <h3 className="font-serif text-xl font-medium text-gray-900 mb-6">Property Specifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Property Type</span>
                <span className="text-gray-850 font-medium text-sm">Penthouse / Apartment</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Listing Status</span>
                <span className="text-green-600 font-semibold text-sm flex items-center gap-1.5">
                  <CheckCircle size={14} /> Active
                </span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Furnishing</span>
                <span className="text-gray-850 font-medium text-sm">Fully Furnished</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Year Built</span>
                <span className="text-gray-850 font-medium text-sm">2023</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Parking Spaces</span>
                <span className="text-gray-850 font-medium text-sm">2 Reserved</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Security</span>
                <span className="text-gray-850 font-medium text-sm">24/7 Concierge</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-serif text-lg font-medium text-gray-900 mb-4">Highlights & Amenities</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Private Balcony",
                  "Air Conditioning",
                  "Smart Home System",
                  "Swimming Pool Access",
                  "Fully Fitted Kitchen",
                  "Panoramic City Views",
                  "Private Lift Access",
                  "State-of-the-art Gym",
                  "Landscaped Gardens"
                ].map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <CheckCircle size={14} className="text-primary shrink-0" />
                    <span className="text-xs text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
    )
}