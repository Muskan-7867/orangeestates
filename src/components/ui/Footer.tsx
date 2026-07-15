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
     

      {/* Top border */}
      <div className="relative z-10 border-t border-white/10 px-4 py-16 sm:px-8 md:px-16 lg:px-24 sm:py-30">
        {/* Main columns */}
        <FooterContent />

        {/* Divider */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-400">
          <p>© 2026 Orange Estate, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-white transition-colors duration-300"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StickyFooter;
