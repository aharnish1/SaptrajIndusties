import React, { useState, useMemo } from "react";
import FacilityHotspot from "./FacilityHotspot";
import FacilityDetails from "./FacilityDetails";

import PlantMap from "../../assets/PlantLayoutMap.png";

const PlantLayout = ({ facilities }) => {
  const defaultFacilityId =
    facilities.find((f) => f.id === "cutting-machine")?.id ||
    facilities[0]?.id;

  const [selectedId, setSelectedId] = useState(defaultFacilityId);

  const selectedFacility = useMemo(() => {
    return facilities.find((f) => f.id === selectedId);
  }, [facilities, selectedId]);

  return (
    <section className="py-20 bg-deep-black border-t border-[#333]">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <h3 className="text-sm md:text-base tracking-[3px] uppercase text-[#f59e0b] mb-4">
            Interactive Tour
          </h3>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Interactive Plant Layout
          </h2>

          <p className="text-gray-300 text-md md:text-lg leading-relaxed max-w-4xl mx-auto">
            Explore our manufacturing facility by clicking different operational
            zones on the layout map. Discover our machinery, infrastructure,
            material handling systems, and production capabilities.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative  rounded-2xl border border-[#2a2a2a] bg-[#171717] shadow-2xl">

              {/* Plant Layout Image */}
              <img
                src={PlantMap}
                alt="Saptraj Industries Plant Layout"
                className="w-full h-auto block"
              />

              {/* Interactive Hotspots */}
              <div className="absolute inset-0">
                {facilities.map((facility) => (
                  <FacilityHotspot
                    key={facility.id}
                    facility={facility}
                    isSelected={selectedId === facility.id}
                    onClick={() => setSelectedId(facility.id)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm italic">
                Click any highlighted facility zone to view details.
              </p>
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            <FacilityDetails facility={selectedFacility} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantLayout;
