"use client";

import { useState, useEffect } from "react";

const words = ["Drill Pedia", "The Archive", "The History", "The Culture"];

export default function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const current = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          setDisplay(current.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            setDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      deleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <span className="inline-flex items-baseline">
      <span>{display}</span>
      <span className="ml-0.5 -mr-1 animate-pulse text-primary-light">|</span>
    </span>
  );
}
