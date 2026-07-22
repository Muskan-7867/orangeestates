import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);


type Props = {
    children: React.ReactNode
}

export default function SmoothScroller({ children }: Props) {

    const wrapper = useRef<HTMLDivElement>(null);
    const content = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const smoother = ScrollSmoother.create({
            wrapper: wrapper.current!,
            content: content.current!,
            smooth: 2.5,
            effects: true,
            normalizeScroll: { allowNestedScroll: true },
            smoothTouch: 0.1,
        });

        return () => smoother.kill();
    }, []);

    return (
        <div ref={wrapper}>
            <div ref={content}>
                {children}
            </div>
        </div>
    )
}