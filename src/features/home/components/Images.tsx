import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const images = [
    {
        url: "https://www.knightfrank.co.uk/site-assets/image-library/homepage-property-carousel-thumbnails/new-homes_kf_cat-link.webp?width=166&rmode=crop&quality=80",
        name: "New homes",
    },
    {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        name: "Coastal",
    },
    {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        name: "With land",
    },
    {
        url: "https://www.knightfrank.co.uk/site-assets/image-library/homepage-property-carousel-thumbnails/new-homes_kf_cat-link.webp?width=166&rmode=crop&quality=80",
        name: "New homes",
    },
    {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        name: "Coastal",
    },
    {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        name: "With land",
    },
    {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        name: "Coastal",
    },
    {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        name: "With land",
    },
];
export default function Images() {
    const scrollRef = useRef<HTMLDivElement>(null)

    const onScrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -400,
            behavior: "smooth"
        })
    }

    const onScrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 400,
            behavior: "smooth"
        })
    }
    return (
        <section className="py-8 px-8">
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide ">
                <div className="flex gap-4 min-w-max">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[170px] text-center"
                        >
                            <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-[98px] object-cover"
                            />

                            <h3 className="mt-3 text-[18px] font-medium text-gray-800">
                                {image.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-end  mt-8">


                {/* Arrows */}
                <div className="flex gap-3">
                    <button onClick={onScrollLeft} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                        <ChevronLeft size={20} />
                    </button>

                    <button onClick={onScrollRight} className="w-8 h-8 rounded-full  border border-gray-300   flex items-center justify-center">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}