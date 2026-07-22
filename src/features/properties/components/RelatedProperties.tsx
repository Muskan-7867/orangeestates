import { PropertyCard } from "#/components/ui/PropertyCard";
import { PropertyCardSkeleton } from "#/components/ui/PropertyCard";

const SKELETON_COUNT = 3;

export default function RelatedProperties({ relatedProperties }: { relatedProperties: any[] }) {
    const isLoading = !relatedProperties || relatedProperties.length === 0;

    return (
        <section className="w-full px-4 md:px-12 lg:px-34 mt-16 sm:mt-24">
            <div className=" pt-16">
                <div className="flex flex-col items-center mb-10">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold">
                        Recommendations
                    </span>
                    <h2 className="mt-2 text-2xl sm:text-4xl font-light font-serif text-gray-900 text-center">
                        Related Properties
                    </h2>
                    <div className="w-12 h-[2px] bg-primary mt-4 rounded-full" />
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {isLoading
                        ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <PropertyCardSkeleton key={i} />
                        ))
                        : relatedProperties.map((relatedProperty: any) => (
                            <PropertyCard
                                key={relatedProperty.id}
                                property={relatedProperty}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}