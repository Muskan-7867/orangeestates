import { PropertyCard } from "#/components/ui/PropertyCard";
import { properties } from "#/constants";

export default function PropertyGrid() {
  return (
    <section className="py-10 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-10 flex flex-col items-center ">
        {/* Section Header */}
        <div className="mb-8 md:mb-14 max-w-5xl flex flex-col items-center px-4 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">
            Featured Properties
          </p>

          <h2 className="font-serif text-2xl md:text-4xl leading-tight text-primary  text-center">
            Exceptional Homes Crafted for Modern Living
          </h2>

          <p className="mt-6  text-md leading-relaxed text-gray-600 text-center">
            Explore a curated collection of luxury residences, elegant
            apartments, and exclusive properties designed to elevate your
            lifestyle and redefine contemporary living.
          </p>
        </div>

        {/* Mobile: horizontal scroll row */}
        <div className="lg:hidden w-full">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4 scrollbar-hide">
            {properties.map((property) => (
              <div key={property.title} className="snap-start shrink-0 w-[78vw] sm:w-[55vw]">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid gap-4 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.title}
              property={property}
            />
          ))}
        </div>
      </div>
    </section>
  );
}