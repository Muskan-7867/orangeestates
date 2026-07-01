import { cn } from "#/lib/utils";
import { Link } from "@tanstack/react-router";

export default function Logo({ className = "", src = "/estate.png", ...props }: { className?: string, src?: string, [key: string]: any }) {
    return (
        <Link to="/" className={cn(`flex   ${className}`, props)}>
            <img fetchPriority="high" src={src} alt="logo" className="h-14 w-auto max-w-[140px] object-contain transition-all duration-300 ease-in-out" />
            {/* <span className="ml-2 text-xl font-bold tracking-tight text-foreground">OrangeEstate</span> */}
        </Link>
    )
}