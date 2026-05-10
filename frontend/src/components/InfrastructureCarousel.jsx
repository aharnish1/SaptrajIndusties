import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InfrastructureCarousel = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full max-w-7xl mx-auto">

      {/* Carousel */}
      <div className="overflow-hidden py-10" ref={emblaRef}>
        
        <div className="flex">

          {slides.map((slide, index) => {
            const isActive = selectedIndex === index;

            return (
              <div
                key={index}
                className="
                  flex-[0_0_85%]
                  md:flex-[0_0_55%]
                  lg:flex-[0_0_42%]
                  min-w-0
                  px-4
                "
              >
                <div
                  className={`
                    relative overflow-hidden rounded-3xl
                    border border-[#222]
                    transition-all duration-700 ease-out
                    group shadow-2xl
                    ${
                      isActive
                        ? 'scale-100 opacity-100 z-20'
                        : 'scale-90 opacity-40 blur-[1px]'
                    }
                  `}
                >

                  {/* Yellow Glow */}
                  {isActive && (
                    <div className="absolute inset-0 z-10 pointer-events-none"></div>
                  )}

                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`
                      w-full
                      h-[260px]
                      md:h-[420px]
                      lg:h-[500px]
                      object-cover
                      transition-all duration-700
                      ${
                        isActive
                          ? 'scale-100'
                          : 'scale-105'
                      }
                      group-hover:scale-105
                    `}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20">

                    <h3
                      className={`
                        text-white font-bold mb-3
                        transition-all duration-500
                        ${
                          isActive
                            ? 'text-2xl md:text-3xl'
                            : 'text-xl'
                        }
                      `}
                    >
                      {slide.title}
                    </h3>

                    {slide.description && (
                      <p
                        className={`
                          text-gray-300 leading-7
                          transition-all duration-500
                          ${
                            isActive
                              ? 'opacity-100 text-base'
                              : 'opacity-70 text-sm'
                          }
                        `}
                      >
                        {slide.description}
                      </p>
                    )}

                  </div>

                  {/* Active Border Glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-3xl border border-yellow-400/40"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Left Button */}
      <button
        onClick={scrollPrev}
        className="
          absolute left-2 md:left-[-20px]
          top-1/2 -translate-y-1/2
          z-30
          bg-black/70 backdrop-blur-md
          hover:bg-yellow-400 hover:text-black
          text-white
          p-4 rounded-full
          transition-all duration-300
          shadow-2xl border border-[#333]
        "
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={scrollNext}
        className="
          absolute right-2 md:right-[-20px]
          top-1/2 -translate-y-1/2
          z-30
          bg-black/70 backdrop-blur-md
          hover:bg-yellow-400 hover:text-black
          text-white
          p-4 rounded-full
          transition-all duration-300
          shadow-2xl border border-[#333]
        "
      >
        <ChevronRight size={24} />
      </button>

    </div>
  );
};

export default InfrastructureCarousel;