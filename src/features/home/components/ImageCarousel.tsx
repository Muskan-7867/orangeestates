import { useState, useEffect } from 'react';
import { FaCampground, FaFire, FaTint, FaHotTub, FaHiking } from 'react-icons/fa';

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  
  const options = [
    {
      title: "Luxury Tent",
      description: "Cozy glamping under the stars",
      image: "https://viandco.co.uk/admin/uploads/properties/18/1771893777_17_ChatGPTImageFeb23202611_09_21PM.png",
      icon: <FaCampground size={24} className="text-white" />
    },
    {
      title: "Campfire Feast",
      description: "Gourmet s'mores & stories",
      image: "https://t3.ftcdn.net/jpg/18/84/88/74/360_F_1884887446_DdLeZ4G9eBsMjS7y9EIr6Q2DFXRMqkSj.jpg",
      icon: <FaFire size={24} className="text-white" />
    },
    {
      title: "Lakeside Retreat",
      description: "Private dock & canoe rides",
      image: "https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,height=1000,fit=cover,quality=75/https://sothebys-assets.s3.eu-west-2.amazonaws.com/c5a6a467-aaf5-4434-9bf0-daced25370fe.jpg",
      icon: <FaTint size={24} className="text-white" />
    },
    {
      title: "Mountain Spa",
      description: "Outdoor sauna & hot tub",
      image: "https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,width=1280,fit=cover,quality=75/https://my-dubai-real-estate.s3.eu-north-1.amazonaws.com/Listing_s3/img_5477.jpg.jpeg",
      icon: <FaHotTub size={24} className="text-white" />
    },
    {
      title: "Guided Adventure",
      description: "Expert-led nature tours",
      image: "https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,width=1280,fit=cover,quality=75/https://my-dubai-real-estate.s3.eu-north-1.amazonaws.com/Listing_s3/pqmigah0z.jpg.jpeg",
      icon: <FaHiking size={24} className="text-white" />
    }
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] py-18 font-sans text-white">
      {/* Header Section */}
      <div className="w-full max-w-2xl px-6  text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-black mb-3 tracking-tight">Escape in Style</h1>
        <p className="text-gray-500 max-w-xl mx-auto">Discover luxurious camping experiences in nature's most breathtaking spots.</p>
      </div>

      <div className="h-12"></div>

      {/* Options Container */}
      <div
        className="options flex w-full mx-auto items-stretch overflow-hidden relative"
        style={{
          maxWidth: '1700px',
          height: 'clamp(300px, 60vw, 600px)',
        }}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? 'active' : ''}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
              backgroundPosition: 'center',
              backfaceVisibility: 'hidden',
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
              minWidth: '44px',
              minHeight: '100px',
              margin: 0,
              borderRadius: 0,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: activeIndex === index ? '#fff' : '#292929',
              cursor: 'pointer',
              backgroundColor: '#18181b',
              boxShadow: activeIndex === index
                ? '0 20px 60px rgba(0,0,0,0.50)'
                : '0 10px 30px rgba(0,0,0,0.30)',
              flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
              zIndex: activeIndex === index ? 10 : 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              position: 'relative',
              overflow: 'hidden',
              willChange: 'flex-grow, box-shadow, background-size, background-position'
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect */}
            <div
              className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: activeIndex === index ? '0' : '-40px',
                height: '120px',
                boxShadow: activeIndex === index
                  ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                  : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000'
              }}
            ></div>

            {/* Label with icon and info */}
            <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-[2] pointer-events-none px-4 gap-3 w-full">
              <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200">
                {option.icon}
              </div>
              <div className="info text-white whitespace-pre relative">
                <div
                  className="main font-bold text-lg transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.title}
                </div>
                <div
                  className="sub text-base text-gray-300 transition-all duration-700 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>

    </div>
  );
};

export default ImageCarousel;