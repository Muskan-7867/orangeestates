import { useState, useEffect, useRef } from "react";

export function getBlurImageUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    if (url.includes("unsplash.com")) {
      urlObj.searchParams.set("w", "20");
      urlObj.searchParams.set("q", "10");
      return urlObj.toString();
    }
    if (urlObj.pathname.includes("_next/image") || urlObj.searchParams.has("url")) {
      urlObj.searchParams.set("w", "16");
      urlObj.searchParams.set("q", "10");
      return urlObj.toString();
    }
    if (urlObj.searchParams.has("w")) {
      urlObj.searchParams.set("w", "20");
    }
    if (urlObj.searchParams.has("q")) {
      urlObj.searchParams.set("q", "10");
    }
    return urlObj.toString();
  } catch {
    return url;
  }
}

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  imgClassName?: string;
  blurStyle?: React.CSSProperties;
  blurSrc?: string;
}

export default function BlurImage({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  imgClassName = "",
  blurStyle,
  blurSrc,
  ...props
}: BlurImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  const blurUrl = blurSrc || (src ? getBlurImageUrl(src) : "");
  const isBlurSupported = src && (
    src.includes("http") || 
    src.includes("_next/image") || 
    src.startsWith("/")
  ) && !src.endsWith(".svg");

  // Split classes: Sizing/Layout to wrapper container, others (like hover/fit/transition) to image.
  const classes = className.split(" ");
  const containerClasses: string[] = ["relative", "overflow-hidden"];
  const imageClasses: string[] = ["w-full", "h-full", "transition-opacity", "duration-500"];

  classes.forEach(cls => {
    if (!cls) return;
    if (
      cls.startsWith("h-") ||
      cls.startsWith("w-") ||
      cls.startsWith("size-") ||
      cls.startsWith("max-h-") ||
      cls.startsWith("max-w-") ||
      cls.startsWith("min-h-") ||
      cls.startsWith("min-w-") ||
      cls.startsWith("aspect-") ||
      cls.startsWith("rounded-") ||
      cls.startsWith("border") ||
      cls.startsWith("shadow") ||
      cls === "absolute" ||
      cls === "relative" ||
      cls === "inset-0" ||
      cls === "top-0" ||
      cls === "left-0" ||
      cls === "right-0" ||
      cls === "bottom-0"
    ) {
      containerClasses.push(cls);
    } else {
      imageClasses.push(cls);
    }
  });

  return (
    <div className={`${containerClasses.join(" ")} ${containerClassName}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${imageClasses.join(" ")} ${imgClassName} ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
      {isBlurSupported && blurUrl && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage: `url(${blurUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            transform: "scale(1.05)",
            opacity: loaded ? 0 : 1,
            ...blurStyle,
          }}
        />
      )}
    </div>
  );
}
