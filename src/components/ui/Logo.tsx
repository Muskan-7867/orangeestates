import { cn } from "#/lib/utils";
import { Link } from "@tanstack/react-router";

export default function Logo({ className = "", src = "/estate.png", ...props }: { className?: string, src?: string, [key: string]: any }) {
    return (
        <Link to="/" className={cn(`flex   ${className}`, props)}>
            <img fetchPriority="high" src={src} alt="logo" className="h-10 sm:h-14 w-auto max-w-35 object-contain transition-all duration-300 ease-in-out" />
   
        </Link>
    )
}