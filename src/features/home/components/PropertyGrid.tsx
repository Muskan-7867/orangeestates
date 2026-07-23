import { Link } from "@tanstack/react-router";
import { properties } from "#/constants";
import { PropertyCard } from "#/components/shared/PropertyCard";

export default function PropertyGrid() {
  const featuredProperties = properties.slice(0, 6);

  return (
    <section className="py-10 lg:py-24 bg-bg">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="mb-8 md:mb-14 max-w-5xl flex flex-col items-center px-4 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">
            Featured Properties
          </p>

          <h2 className="font-serif text-2xl md:text-4xl leading-tight text-primary">
            Exceptional Homes Crafted for Modern Living
          </h2>

          <p className="mt-6 text-md leading-relaxed text-gray-600">
            Explore a curated collection of luxury residences, elegant
            apartments, and exclusive properties designed to elevate your
            lifestyle and redefine contemporary living.
          </p>

          {/* Explore Button */}
          <div className="mt-10 lg:mt-14">
            <Link
              to="/properties"
              className="group inline-flex items-center gap-3 bg-primary px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300  hover:bg-primary/90 "
            >
              Explore Properties

            </Link>
          </div>
        </div>

        {/* Mobile: horizontal scroll row */}
        <div className="lg:hidden w-full">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4 scrollbar-hide">
            {featuredProperties.map((property) => (
              <div
                key={property.title}
                className="snap-start shrink-0 w-[78vw] sm:w-[55vw]"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid gap-4 lg:grid-cols-3">
          {featuredProperties.map((property) => (
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