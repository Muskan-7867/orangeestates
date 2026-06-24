import { cn } from "#/lib/utils";
import React from "react";
import FooterContent from "../footer/FooterContent";
import { Link } from "@tanstack/react-router";

type StickyFooterProps = React.ComponentProps<"footer">;

const StickyFooter = ({ className, ...props }: StickyFooterProps) => {
  return (
    <footer
      className={cn(
        "relative w-full bg-zinc-900 text-white overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Decorative background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 isolate z-0 overflow-hidden">
        <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.04)_0,rgba(140,140,140,0.02)_50%,rgba(255,255,255,0.01)_80%)] absolute -top-20 -left-20 h-[36rem] w-[36rem] -rotate-45 rounded-full" />
        <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-[28rem] w-[28rem] translate-x-1/3 -translate-y-1/4 rounded-full" />
      </div>

      {/* Top border */}
      <div className="relative z-10 border-t border-white/10 px-4 py-16 sm:px-8 md:px-16 lg:px-24 sm:py-30">
        {/* Main columns */}
        <FooterContent />

        {/* Divider */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-400">
          <p>© 2026 Orange Estate, Inc. All rights reserved.</p>
          <Link
            to="/"
            className="hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default StickyFooter;
