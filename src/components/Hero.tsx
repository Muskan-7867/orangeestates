import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

export default function Hero() {
    return (
        <div className="relative h-[70vh] w-full">
            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
            >
                <source
                    src="https://ik.imagekit.io/p8eiybmze/WhatsApp%20Video%202026-03-30%20at%201.03.51%20PM.mp4?updatedAt=1774856134608"
                    type="video/mp4"
                />
            </video>
 


            <div className="absolute inset-0 flex flex-col items-center justify-end px-4 py-12">
                {/* Links */}
                <div className="w-full max-w-lg flex justify-center gap-6 mb-3">
                    <Link
                        to="/"
                        className="text-white font-medium border-b-2 border-white pb-1"
                    >
                        Buy
                    </Link>

                    <Link to="/" className="text-white font-medium">
                        Rent
                    </Link>

                    <Link to="/" className="text-white font-medium">
                        Sell
                    </Link>
                </div>

                {/* Search Box */}
                <div className="flex items-center gap-3 bg-white px-5 py-3 w-full max-w-3xl">
                    <Search className="text-gray-500" size={20} />

                    <input
                        type="text"
                        placeholder="Search for Properties..."
                        className="flex-1 outline-none text-gray-800 placeholder:text-gray-500"
                    />
                </div>

         
            </div>
        </div>
    );
}