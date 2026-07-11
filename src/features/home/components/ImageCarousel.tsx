import { useState, useEffect, useRef } from 'react';
import { FaCampground, FaFire, FaTint, FaHotTub, FaHiking } from 'react-icons/fa';

function CarouselImage({
  src,
  blurSrc,
  isActive,
}: {
  src: string;
  blurSrc: string;
  isActive: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  return (
    <>
      {src && (
        <img
          ref={imgRef}
          src={src}
          alt=""
          onLoad={() => setLoaded(true)}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          style={{
            transform: isActive ? 'scale(1)' : 'scale(1.08)',
            opacity: loaded ? 1 : 0,
          }}
        />
      )}
      {/* Blur placeholder shown until full image loads */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `url('${blurSrc}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
          transform: isActive ? 'scale(1)' : 'scale(1.08)',
          opacity: loaded ? 0 : 1,
        }}
      />
    </>
  );
}

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const options = [
    {
      title: 'Luxury Tent',
      description: 'Cozy glamping under the stars',
      image: 'https://viandco.co.uk/admin/uploads/properties/18/1771893777_17_ChatGPTImageFeb23202611_09_21PM.png',
      blurImage: 'https://viandco.co.uk/admin/uploads/properties/18/1771893777_17_ChatGPTImageFeb23202611_09_21PM.png',
      icon: <FaCampground size={20} className="text-white" />,
    },
    {
      title: 'Campfire Feast',
      description: "Gourmet s'mores & stories",
      image: 'https://t3.ftcdn.net/jpg/18/84/88/74/360_F_1884887446_DdLeZ4G9eBsMjS7y9EIr6Q2DFXRMqkSj.jpg',
      blurImage: 'https://t3.ftcdn.net/jpg/18/84/88/74/360_F_1884887446_DdLeZ4G9eBsMjS7y9EIr6Q2DFXRMqkSj.jpg',
      icon: <FaFire size={20} className="text-white" />,
    },
    {
      title: 'Lakeside Retreat',
      description: 'Private dock & canoe rides',
      image: 'https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,height=1000,fit=cover,quality=75/https://sothebys-assets.s3.eu-west-2.amazonaws.com/c5a6a467-aaf5-4434-9bf0-daced25370fe.jpg',
      blurImage: 'https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,height=20,fit=cover,quality=10/https://sothebys-assets.s3.eu-west-2.amazonaws.com/c5a6a467-aaf5-4434-9bf0-daced25370fe.jpg',
      icon: <FaTint size={20} className="text-white" />,
    },
    {
      title: 'Mountain Spa',
      description: 'Outdoor sauna & hot tub',
      image: 'https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,width=1280,fit=cover,quality=75/https://my-dubai-real-estate.s3.eu-north-1.amazonaws.com/Listing_s3/img_5477.jpg.jpeg',
      blurImage: 'https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,width=20,fit=cover,quality=10/https://my-dubai-real-estate.s3.eu-north-1.amazonaws.com/Listing_s3/img_5477.jpg.jpeg',
      icon: <FaHotTub size={20} className="text-white" />,
    },
    {
      title: 'Guided Adventure',
      description: 'Expert-led nature tours',
      image: 'https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,width=1280,fit=cover,quality=75/https://my-dubai-real-estate.s3.eu-north-1.amazonaws.com/Listing_s3/pqmigah0z.jpg.jpeg',
      blurImage: 'https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,width=20,fit=cover,quality=10/https://my-dubai-real-estate.s3.eu-north-1.amazonaws.com/Listing_s3/pqmigah0z.jpg.jpeg',
      icon: <FaHiking size={20} className="text-white" />,
    },
  ];

  /* â”€â”€ Detect mobile breakpoint (< 640 px = Tailwind sm) â”€â”€ */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  /* â”€â”€ Staggered entrance animation â”€â”€ */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      const t = setTimeout(() => setAnimatedOptions(prev => [...prev, i]), 140 * i);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  /* â”€â”€ Auto-cycle on mobile every 3.5 s â”€â”€ */
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % options.length);
    }, 3500);
    return () => clearInterval(id);
  }, [isMobile, options.length]);

  const handleOptionClick = (index: number) => setActiveIndex(index);


  if (isMobile) {
    return (
      <div className="flex flex-col items-center py-12 px-4 font-sans">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-primary mb-2">Escape in Style</h2>
          <p className="text-sm text-gray-500">
            Discover luxurious camping experiences in nature&apos;s most breathtaking spots.
          </p>
        </div>

        {/* Cards */}
        <div className="w-full flex flex-col gap-2">
          {options.map((option, index) => {
            const isActive = activeIndex === index;
            const isAnimated = animatedOptions.includes(index);
            return (
              <div
                key={index}
                onClick={() => handleOptionClick(index)}
                className="relative overflow-hidden cursor-pointer"
                style={{
                  height: isActive ? '220px' : '58px',
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? 'translateY(0)' : 'translateY(24px)',
                  transition:
                    'height 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, transform 0.5s ease, box-shadow 0.4s ease',
                  boxShadow: isActive
                    ? '0 16px 48px rgba(0,0,0,0.45)'
                    : '0 2px 8px rgba(0,0,0,0.18)',
                  backgroundColor: '#18181b',
                }}
              >
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <CarouselImage src={option.image} blurSrc={option.blurImage} isActive={isActive} />
                </div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 z-1 pointer-events-none"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)'
                      : 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 100%)',
                    transition: 'background 0.55s ease',
                  }}
                />

                {/* Label row â€” pinned to bottom */}
                <div className="absolute inset-x-0 bottom-0 z-2 flex items-center gap-3 px-4 pb-3 pt-2">
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.88)] backdrop-blur-[10px] border-2 border-[#444] shrink-0 transition-all duration-500"
                    style={{
                      width: isActive ? '40px' : '34px',
                      height: isActive ? '40px' : '34px',
                    }}
                  >
                    {option.icon}
                  </div>

                  {/* Text */}
                  <div className="text-white">
                    <div className="font-semibold text-sm leading-tight">{option.title}</div>
                    <div
                      className="text-xs text-gray-300 overflow-hidden transition-all duration-600"
                      style={{
                        opacity: isActive ? 1 : 0,
                        maxHeight: isActive ? '20px' : '0px',
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pill dot indicator */}
        <div className="flex gap-2 mt-5">
          {options.map((_, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(i)}
              aria-label={`Go to ${options[i].title}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? '20px' : '8px',
                height: '8px',
                backgroundColor: activeIndex === i ? 'var(--color-primary, #f97316)' : '#d1d5db',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-16 font-sans text-white px-4 sm:px-6">
      {/* Header */}
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-3">Escape in Style</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
          Discover luxurious camping experiences in nature&apos;s most breathtaking spots.
        </p>
      </div>

      <div className="h-10 sm:h-12" />

      {/* Horizontal accordion strip */}
      <div
        className="flex w-full mx-auto items-stretch overflow-hidden relative"
        style={{
          maxWidth: '1700px',
          height: 'clamp(260px, 55vw, 620px)',
          // borderRadius: '16px',
        }}
      >
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          const isAnimated = animatedOptions.includes(index);
          return (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              className="relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out"
              style={{
                backfaceVisibility: 'hidden',
                opacity: isAnimated ? 1 : 0,
                transform: isAnimated ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: '52px',
                cursor: 'pointer',
                backgroundColor: '#18181b',
                boxShadow: isActive
                  ? '0 20px 60px rgba(0,0,0,0.50)'
                  : '0 10px 30px rgba(0,0,0,0.30)',
                flex: isActive ? '7 1 0%' : '1 1 0%',
                zIndex: isActive ? 10 : 1,
                willChange: 'flex-grow, box-shadow',
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <CarouselImage src={option.image} blurSrc={option.blurImage} isActive={isActive} />
              </div>

              {/* Bottom vignette shadow */}
              <div
                className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  bottom: isActive ? '0' : '-40px',
                  height: '120px',
                  boxShadow: isActive
                    ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                    : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000',
                }}
              />

              {/* Label row */}
              <div className="absolute left-0 right-0 bottom-4 sm:bottom-5 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 z-2 pointer-events-none w-full">
                {/* Icon */}
                <div className="flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] shrink-0">
                  {option.icon}
                </div>

                {/* Title + description */}
                <div className="text-white overflow-hidden">
                  <div
                    className="font-bold text-sm sm:text-lg leading-tight transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="text-xs sm:text-base text-gray-300 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageCarousel;
