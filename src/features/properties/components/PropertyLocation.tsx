
import { useState } from "react";
export default function PropertyLocation({ property }: { property: any }) {
    const [openMap, setOpenMap] = useState(false);
    return (
        <div className="bg-white p-6 border border-gray-100 space-y-6">
            <div>
                <h3 className="font-serif text-lg font-medium text-gray-900">Location</h3>
                <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                    <span className="inline-block w-1.5 h-1.5 bg-[#0c1e36] rounded-full animate-pulse" />
                    {property.title}
                </p>
            </div>

            <div
                onClick={() => setOpenMap(true)}
                className="relative w-full h-55 bg-gray-50 overflow-hidden group border border-gray-100 cursor-pointer"
            >
                <iframe
                    title="Property Location Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        property.title
                    )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0 filter grayscale contrast-[1.15] brightness-[0.98] transition-all duration-700 group-hover:filter-none pointer-events-none"
                    allowFullScreen
                    loading="lazy"
                />

           
            </div>

            {/* Neighborhood quick details */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                    <span className="bg-primary/5 text-primary p-1 rounded text-[9px] uppercase font-bold tracking-wider shrink-0 w-16 text-center">Transit</span>
                    <div>
                        <div className="text-[11px] font-semibold text-gray-900">Underground Station (0.3 mi)</div>
                        <div className="text-[9px] text-gray-400">5-minute walk</div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <span className="bg-primary/5 text-primary p-1 rounded text-[9px] uppercase font-bold tracking-wider shrink-0 w-16 text-center">School</span>
                    <div>
                        <div className="text-[11px] font-semibold text-gray-900">Top-Tier School (0.6 mi)</div>
                        <div className="text-[9px] text-gray-400">10-minute drive</div>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <span className="bg-primary/5 text-primary p-1 rounded text-[9px] uppercase font-bold tracking-wider shrink-0 w-16 text-center">Shopping</span>
                    <div>
                        <div className="text-[11px] font-semibold text-gray-900">Premium High Street (0.1 mi)</div>
                        <div className="text-[9px] text-gray-400">2-minute walk</div>
                    </div>
                </div>
            </div>
            {openMap && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
                    onClick={() => setOpenMap(false)}
                >
                    <div
                        className="relative w-full max-w-7xl h-[60vh] bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setOpenMap(false)}
                            className="absolute top-4 right-4 z-10 bg-white px-3 py-2 shadow"
                        >
                            ✕
                        </button>

                        <iframe
                            title="Full Screen Map"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                property.title
                            )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                            className="w-full h-full border-0"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>



    )
}