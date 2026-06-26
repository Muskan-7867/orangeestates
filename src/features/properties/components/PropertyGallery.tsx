import { cn } from "#/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


export default function PropertyGallery({ property }: { property: any }) {
  const [activeImageIndex, setActiveImageIndex] = useState(1);
  const [direction, setDirection] = useState(0);
  const totalImages = property.images.length;

const prevIndex =
    activeImageIndex === 0
      ? totalImages - 1
      : activeImageIndex - 1;


  const nextIndex =
    activeImageIndex === totalImages - 1
      ? 0
      : activeImageIndex + 1;

 const handlePrev = () => {
    setDirection(-1);
    setActiveImageIndex((prev) =>
      prev === 0 ? totalImages - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveImageIndex((prev) =>
      prev === totalImages - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className=" p-2">

      <div className=" h-[80vh] flex justify-center items-center gap-4">


        {
          property.images.map((img: any, index: number) => {
            const prevIndex = activeImageIndex - 1
            const nextIndex = activeImageIndex + 1

            if (index === activeImageIndex || index === prevIndex || index === nextIndex) {
              return (

                <div className={cn(`h-[70vh]  `,

                  index === activeImageIndex ? "w-[90%]" : "w-[10%]"
                )}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              )
            }

          })
        }



      </div>

      <div>
        <button onClick={handlePrev}>
          <ChevronLeft size={24} />
        </button>

        <button onClick={handleNext}>
          <ChevronRight size={24} />
        </button>
      </div>



    </section>
  )
}