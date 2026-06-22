import { Menu } from "lucide-react";
export default function Navbar() {
    return (
        <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50">

            {/* Menu Icon */}
            <button className="text-[#0B2A57]">
                <Menu />
            </button>

            {/* Center Logo */}
            <div className="flex items-center gap-4 text-[#0B2A57]">
                <div className="text-right leading-none">
                    <p className="text-sm">United</p>
                    <p className="text-sm">Kingdom</p>
                </div>

                <div className="h-10 w-px bg-gray-300"></div>

                <div>
                    <h1 className="text-3xl font-serif">Orange</h1>
                    <p className="text-[9px] tracking-[2px] uppercase text-gray-500 ml-1">
                        Real Estate
                    </p>
                </div>
            </div>

            {/* Empty space to balance layout */}
            <div className="w-7"></div>
        </nav>
    );
}