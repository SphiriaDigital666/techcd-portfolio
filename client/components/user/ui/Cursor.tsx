"use client";

import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      cursor.style.left = e.clientX.toString() + "px";
      cursor.style.top = e.clientY.toString() + "px";
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="bg-foreground/30 pointer-events-none fixed right-0 left-0 z-[999] aspect-square w-[0.7em] rounded-full backdrop-blur-[1px]"
      style={{ transform: "translateX(-50%) translateY(-50%)" }}
    ></div>
  );
};

export default Cursor;
