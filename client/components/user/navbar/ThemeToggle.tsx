"use client";

import React from "react";

const ThemeToggle = () => {
  const toggleTheme = () => document.documentElement.classList.toggle("dark");

  return (
    <button
      className="border-foreground/50 relative h-[1.6em] w-[3.5em] rounded-full border-2 p-[0.1em]"
      onClick={toggleTheme}
    >
      <div className="bg-foreground absolute top-0 bottom-0 left-[0.1em] my-auto size-[1.2em] rounded-full transition-all duration-300 ease-in dark:left-[calc(100%-1.2em-0.1em)]"></div>
    </button>
  );
};

export default ThemeToggle;
