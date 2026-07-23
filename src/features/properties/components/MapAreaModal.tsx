import { useState } from "react";
import { createPortal } from "react-dom";
import { MapPin, Search, X, Check, Navigation, Globe, Building2 } from "lucide-react";

export interface AreaLocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  zoom: number;
  description: string;
  tag: string;
  propertiesCount: number;
}

export const AREA_LOCATIONS: AreaLocation[] = [
  {
    id: "mayfair",
    name: "Mayfair",
    country: "UK",
    lat: 51.5118,
    lng: -0.1472,
    zoom: 15,
    description: "Exclusive Central London enclave with luxury townhouse mansions",
    tag: "Prime UK",
    propertiesCount: 8,
  },
  {
    id: "bayswater",
    name: "Bayswater",
    country: "UK",
    lat: 51.5125,
    lng: -0.1878,
    zoom: 15,
    description: "Stately Victorian architecture & Hyde Park proximity",
    tag: "Garden Square",
    propertiesCount: 6,
  },
  {
    id: "albert-embankment",
    name: "Albert Embankment",
    country: "UK",
    lat: 51.4912,
    lng: -0.1235,
    zoom: 15,
    description: "River Thames skyline views & modern penthouse suites",
    tag: "River View",
    propertiesCount: 5,
  },
  {
    id: "downtown-dubai",
    name: "Downtown Dubai",
    country: "Dubai",
    lat: 25.1972,
    lng: 55.2744,
    zoom: 14,
    description: "Burj Khalifa, Opera District & luxury high-rise residences",
    tag: "Luxury Hub",
    propertiesCount: 14,
  },
  {
    id: "palm-jumeirah",
    name: "Palm Jumeirah",
    country: "Dubai",
    lat: 25.1124,
    lng: 55.1390,
    zoom: 13,
    description: "Iconic palm-shaped archipelago featuring beachfront villas",
    tag: "Beachfront",
    propertiesCount: 9,
  },
  {
    id: "dubai-marina",
    name: "Dubai Marina",
    country: "Dubai",
    lat: 25.0772,
    lng: 55.1332,
    zoom: 14,
    description: "Waterfront promenade living & luxury yacht club district",
    tag: "Waterfront",
    propertiesCount: 11,
  },
  {
    id: "business-bay",
    name: "Business Bay",
    country: "Dubai",
    lat: 25.1850,
    lng: 55.2670,
    zoom: 14,
    description: "Financial hub with Dubai Canal views & modern duplexes",
    tag: "City Center",
    propertiesCount: 7,
  },

];

interface MapAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedArea: string;
  onSelectArea: (area: string) => void;
}

export default function MapAreaModal({
  isOpen,
  onClose,
  selectedArea,
  onSelectArea,
}: MapAreaModalProps) {
  const [areaSearch, setAreaSearch] = useState("");
  const [activeLocation, setActiveLocation] = useState<AreaLocation>(() => {
    const found = AREA_LOCATIONS.find((a) => a.name === selectedArea);
    return found || AREA_LOCATIONS[0];
  });

  if (!isOpen) return null;

  const filteredLocations = AREA_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(areaSearch.toLowerCase()) ||
      loc.country.toLowerCase().includes(areaSearch.toLowerCase()) ||
      loc.description.toLowerCase().includes(areaSearch.toLowerCase())
  );

  const handleConfirmSelect = (locationName: string) => {
    onSelectArea(locationName);
    onClose();
  };

  const handleClearArea = () => {
    onSelectArea("All");
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-5xl h-[85vh] max-h-[750px] bg-background overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="px-4 py-2.5 flex items-center justify-end bg-white border-b border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Grid (Interactive Map + Area Sidebar) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          {/* Left Column: Interactive Map Canvas */}
          <div className="relative flex-1 bg-gray-100 flex flex-col h-full min-h-[480px]">
            {/* Embedded OpenStreetMap View */}
            <iframe
              title="Property Area Map"
              width="100%"
              height="100%"
              className="w-full h-full border-0 filter contrast-[1.05]"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeLocation.lng - 0.035},${activeLocation.lat - 0.025},${activeLocation.lng + 0.035},${activeLocation.lat + 0.025}&layer=mapnik&marker=${activeLocation.lat},${activeLocation.lng}`}
            />

            {/* Floating Location Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-gray-200 shadow-md p-3 max-w-xs transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-primary/10 text-primary">
                  {activeLocation.tag}
                </span>
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-primary" />
                  {activeLocation.country}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 flex items-center justify-between gap-2">
                <span>{activeLocation.name}</span>
                <span className="text-xs font-normal text-gray-500">
                  {activeLocation.propertiesCount} properties
                </span>
              </h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {activeLocation.description}
              </p>
            </div>

            {/* Quick Map Pins Ribbon */}
            <div className="absolute bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg p-2.5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <span className="text-xs font-medium text-gray-500 shrink-0 px-1 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-primary" />
                Quick Pins:
              </span>
              {AREA_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc)}
                  className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${activeLocation.id === loc.id
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>{loc.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Search & Printable Area Selection List */}
          <div className="w-full md:w-80 lg:w-96 border-t md:border-t-0 md:border-l border-gray-200 bg-white flex flex-col h-full min-h-0 shrink-0">
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200 bg-gray-50 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={areaSearch}
                  onChange={(e) => setAreaSearch(e.target.value)}
                  placeholder="Search location or area..."
                  className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-white border border-gray-300 focus:outline-none focus:border-primary transition-colors text-gray-800 placeholder-gray-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {areaSearch && (
                  <button
                    onClick={() => setAreaSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Area Cards */}
            <div
              className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full"
            // onWheel={(e) => e.stopPropagation()}
            // onTouchMove={(e) => e.stopPropagation()}
            >
              {filteredLocations.map((loc) => {
                const isSelected = selectedArea === loc.name;
                const isActiveMap = activeLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setActiveLocation(loc)}
                    className={`p-3.5 border transition-all cursor-pointer ${isSelected
                      ? "border-primary bg-primary/5 shadow-xs"
                      : isActiveMap
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {loc.tag}
                          </span>
                          <span className="text-[11px] text-gray-500 font-medium">
                            • {loc.country}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-gray-400" />
                          <span>{loc.name}</span>
                        </h4>
                      </div>
                      {isSelected && (
                        <span className="p-1 bg-primary text-white text-xs shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed line-clamp-2">
                      {loc.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-[11px] text-gray-500">
                        {loc.propertiesCount} properties listed
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmSelect(loc.name);
                        }}
                        className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${isSelected
                          ? "bg-primary text-white"
                          : "bg-white  text-primary border"
                          }`}
                      >
                        {isSelected ? "Selected" : "Select Area"}
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredLocations.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-medium">No area found matching &quot;{areaSearch}&quot;</p>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-2 shrink-0">
              <button
                onClick={handleClearArea}
                className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer text-center"
              >
                Clear Area
              </button>
              <button
                onClick={() => handleConfirmSelect(activeLocation.name)}
                className="flex-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary/90 shadow-md transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Apply {activeLocation.name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
