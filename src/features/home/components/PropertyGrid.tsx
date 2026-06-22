import { PropertyCard } from "#/components/ui/PropertyCard";
import { properties } from "#/constants";

export default function PropertyGrid() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1800px] px-10 flex flex-col items-center ">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl flex flex-col items-center ">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-500">
            Featured Properties
          </p>

          <h2 className="font-serif text-4xl leading-tight text-[#001f4d] md:text-5xl text-center">
            Exceptional Homes Crafted for Modern Living
          </h2>

          <p className="mt-6 max-w-2xl text-md leading-relaxed text-gray-600 text-center">
            Explore a curated collection of luxury residences, elegant
            apartments, and exclusive properties designed to elevate your
            lifestyle and redefine contemporary living.
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid gap-4 lg:grid-cols-3">
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