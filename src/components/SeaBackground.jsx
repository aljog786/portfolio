// react-pf/src/components/SeaBackground.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const SeaBackground = () => {
  const containerRef = useRef(null);
  const bubbleContainerRef = useRef(null);

  useEffect(() => {
    // Create bubbles continuously
    const bubbleInterval = setInterval(() => {
      if (!bubbleContainerRef.current) return;

      const bubble = document.createElement("div");
      bubble.className = "absolute rounded-full bg-white opacity-70";

      // Random bubble properties
      const size = Math.random() * 20 + 5;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 5;

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.bottom = "0";
      bubble.style.boxShadow = "0 0 5px 2px rgba(173, 216, 230, 0.7)";

      bubbleContainerRef.current.appendChild(bubble);

      // Animate bubble
      gsap.to(bubble, {
        y: "-100vh",
        opacity: 0,
        duration: duration,
        ease: "none",
        onComplete: () => {
          bubble.remove();
        },
      });
    }, 300);

    return () => {
      clearInterval(bubbleInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Ocean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-700 dark:from-sky-800 dark:to-blue-900"></div>

      {/* Bubble container */}
      <div ref={bubbleContainerRef} className="absolute inset-0" />

    </div>
  );
};
