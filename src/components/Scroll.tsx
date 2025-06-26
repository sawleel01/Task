"use client";

import React, { useEffect, useState, useRef, useCallback, FC } from "react";
import ElementBlock from "@/components/Elements";

interface ScrollProps {
  start: number;
  end: number;
  direction: "vertical" | "horizontal";
}

const Scroll: FC<ScrollProps> = ({ start, end, direction }) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadNext = useCallback(async () => {
    if (visibleItems.length >= end - start + 1) return;

    await new Promise((res) => setTimeout(res, 500));
    setVisibleItems((prev) => [...prev, start + prev.length]);
  }, [visibleItems.length, start, end]);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadNext();
      },
      { root: null, threshold: 0.5 }
    );

    observer.current.observe(target);
    return () => observer.current?.disconnect();
  }, [loadNext]);

  return (
    <div
      className={`${
        direction === "horizontal"
          ? "flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory whitespace-nowrap"
          : "flex flex-col overflow-y-auto snap-y snap-mandatory"
      } h-screen w-screen`}
      ref={containerRef}
    >
      {visibleItems.map((num) => (
        <div
          key={num}
          className={`snap-start flex-shrink-0 ${
            direction === "horizontal" ? "w-screen h-screen" : "w-full"
          }`}
        >
          <ElementBlock element={num} />
        </div>
      ))}
    </div>
  );
};

export default Scroll;
