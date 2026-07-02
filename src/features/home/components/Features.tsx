import {
  Building2,
  Users,
  Globe,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    value: "1100",
    label: "Offices Worldwide",
  },
  {
    icon: Users,
    value: "25,000",
    label: "Sales Associates",
  },
  {
    icon: Globe,
    value: "200",
    label: "Countries & Territories",
  },
  {
    icon: CalendarDays,
    value: "85",
    label: "Years in Business",
  },
];

export default function Features() {
  return (
    <section className="my-20 px-6 sm:px-16 md:px-24 lg:px-36">
      <div className="grid grid-cols-2 md:grid-cols-4 ">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.label}
              className="flex flex-col items-center text-center group"
            >
              <div className=" flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 transition-all duration-300  ">
                <Icon size={26} strokeWidth={1.5} />
              </div>

              <h2 className="text-3xl font-semibold text-neutral-900">
                {feature.value}
              </h2>

              <p className="mt-2 text-sm sm:text-base text-neutral-500">
                {feature.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}