
import { useState, useEffect, useRef } from "react";

const images = [
  {
    src: "https://adamxrealty.com/_next/image?url=https%3A%2F%2Fcdn.omenterprisesgroup.in%2Fuploads%2Fadamx%2FStudio%20%20Damac%20Maison%20The%20Distinction-images-1.jpg-e0df8bcc-0fff-4d7b-85e0-634b561630eb.webp&w=640&q=75",
  },
  {
    src: "https://adamxrealty.com/_next/image?url=https%3A%2F%2Fcdn.omenterprisesgroup.in%2Fuploads%2Fadamx%2F3BR%20%20Damac%20Maison%20The%20Distinction_pages-to-jpg-0002.jpg-f7d047bd-5722-4e74-9a9b-37e001f36a30.webp&w=640&q=75",
  },
  {
    src: "https://adamxrealty.com/_next/image?url=https%3A%2F%2Fcdn.omenterprisesgroup.in%2Fuploads%2Fadamx%2FSol_Levante_by_Sol_Properties_at%20(1).webp-e6ed0706-5255-4b74-b302-cce41fae0400.webp&w=640&q=75",
  },
  {
    src: "https://adamxrealty.com/_next/image?url=https%3A%2F%2Fcdn.omenterprisesgroup.in%2Fuploads%2Fadamx%2Fbinghatti-pinnacle2.jpeg-8f313994-c879-4ddc-9d90-f8ca3512924e.webp&w=640&q=75",
  },
  {
    src: "https://adamxrealty.com/_next/image?url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRgno8KKmm46kvbM9f-H3XU53bT-nxqlYPLqQ%26s&w=1920&q=75",
  },
  {
    src: "https://adamxrealty.com/_next/image?url=https%3A%2F%2Fwww.yukio.in%2Fblog%2Fwp-content%2Fuploads%2F2025%2F04%2FTallest-Buildings-in-Pune.jpg&w=1920&q=75",
  },
  {
    src: "https://adamxrealty.com/_next/image?url=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fnew-york-city_649448-1679.jpg%3Fsemt%3Dais_hybrid%26w%3D740%26q%3D80&w=1920&q=75",
  },
];


interface BlurImageProps {
  src: string;
  alt?: string;
  className?: string;
  draggable?: boolean;
}

function BlurImage({
  src,
  alt = "",
  className = "",
  draggable = false,
  
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Fix: if the image is already cached, onLoad won't fire.
  // Check img.complete right after mount to handle cached images.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Blurred placeholder */}
      <img
        src={src}
        alt=""
        aria-hidden
        className={`absolute inset-0 w-full h-full object-cover scale-110 blur-2xl brightness-75 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
      />

      {/* Actual image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={draggable}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
export default function PropertyHero() {
  const getImageClassName = (index: number) => {
    // 1. Center image (index 3)
    if (index === 3) {
      return "absolute left-[37%] top-[3%] w-[26%] h-[420px] z-30 rounded-[28px] overflow-hidden transition-all duration-500 hover:scale-105 hover:z-40  border border-white/15";
    }

    const isEven = index % 2 === 0;
    const isLeft = index < 3;

    if (isEven) {
      // Even indexes: 0, 2, 4, 6
      if (isLeft) {
        // index 0: Far Left
        // index 2: Inner Left Top (Bread/Flour background)
        return index === 0
          ? "absolute left-[4%] bottom-[12%] w-[13%] h-[280px] z-10 rounded-[20px] overflow-hidden  transition-all duration-500 hover:scale-105 hover:z-40  border border-white/5"
          : "absolute left-[18%] top-[6%] w-[21%] h-[210px] z-10 rounded-[20px] overflow-hidden  transition-all duration-500 hover:scale-105 hover:z-40  border border-white/5";
      } else {
        // index 4: Inner Right Top (Flowers background)
        // index 6: Far Right (Car)
        return index === 6
          ? "absolute right-[4%] bottom-[12%] w-[15%] h-[300px] z-10 rounded-[20px] overflow-hidden  transition-all duration-500 hover:scale-105 hover:z-40  border border-white/5"
          : "absolute left-[59%] top-[4%] w-[18%] h-[210px] z-10 rounded-[20px] overflow-hidden  transition-all duration-500 hover:scale-105 hover:z-40  border border-white/5";
      }
    } else {
      // Odd indexes: 1, 5
      // index 1: Left Mid (Curology foreground)
      // index 5: Right Mid (Sunset foreground)
      return isLeft
        ? "absolute left-[15%] bottom-0 w-[17%] h-[380px] z-20 rounded-[20px] overflow-hidden  transition-all duration-500 hover:scale-105 hover:z-40  border border-white/10"
        : "absolute left-[59%] bottom-0 w-[22%] h-[190px] z-20 rounded-[20px] overflow-hidden  transition-all duration-500 hover:scale-105 hover:z-40  border border-white/10";
    }
  };

  return (
    <section className="py-16 px-6 rounded-[32px] text-white overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        {/* Gallery */}
        <div className="relative h-[480px] hidden lg:block w-full">
          {images.map((image, index) => {
            const className = getImageClassName(index);
            return (
              <div key={index} className={className}>
                <BlurImage
                  src={image.src}
                  alt=""
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
              </div>
            );
          })}

          {/* Buttons */}
          {/* <button className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white border border-white/10 rounded-xl flex items-center justify-center transition-all cursor-pointer z-40 hover:scale-105 active:scale-95">
            <ChevronLeft size={20} />
          </button>

          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 text-white border border-white/10 rounded-xl flex items-center justify-center transition-all cursor-pointer z-40 hover:scale-105 active:scale-95">
            <ChevronRight size={20} />
          </button> */}
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-white/5"
            >
               <BlurImage
                  src={image.src}
                  alt=""
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}