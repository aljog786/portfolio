import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const SeaBackground = () => {
  const [bubbles, setBubbles] = useState([]);
  const waveRef1 = useRef(null);
  const waveRef2 = useRef(null); // For a second wave to create seamless loop
  const waveRef3 = useRef(null); // Adding a third wave for more depth

  useEffect(() => {
    generateBubbles();
    const handleResize = () => generateBubbles();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    // GSAP Wave Animation
    if (waveRef1.current && waveRef2.current && waveRef3.current) {
      const duration = 25; // Slower duration for more natural flow

      gsap.to(waveRef1.current, {
        x: "-100%", // Move wave to the left by its full width
        duration: duration,
        ease: "none",
        repeat: -1, // Infinite repeat
        overwrite: "auto",
      });

      gsap.to(waveRef2.current, {
        x: "-100%", // Move wave to the left by its full width
        duration: duration, // Same duration as wave1
        ease: "none",
        repeat: -1, // Infinite repeat
        delay: duration / 2, // Start half-way through wave1's animation for seamless loop
        overwrite: "auto",
      });

      gsap.to(waveRef3.current, {
        x: "-100%",
        duration: duration * 1.2, // Slightly different speed for parallax effect
        ease: "none",
        repeat: -1,
        delay: duration / 4, // Staggered start
        overwrite: "auto",
      });
    }
  }, []);

  const generateBubbles = () => {
    const bubbleCount = Math.floor(
      (window.innerWidth * window.innerHeight) / 20000
    );
    const newBubbles = [];

    for (let i = 0; i < bubbleCount; i++) {
      newBubbles.push({
        id: i,
        size: Math.random() * 15 + 5,
        x: Math.random() * 100,
        y: Math.random() * 30 + 70,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 5,
      });
    }

    setBubbles(newBubbles);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ocean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-700 dark:from-sky-800 dark:to-blue-900"></div>

      {/* Waves */}
      {/* Wave 1: Closest, most prominent */}
      <div
        ref={waveRef1}
        className="absolute bottom-0 left-0 w-[200%] h-48 bg-blue-500 opacity-40 rounded-[40%] blur-xl animate-float" // Increased height, more rounded, subtle float
        style={{ transform: "translateX(0%)" }}
      ></div>
      {/* Wave 2: Mid-ground */}
      <div
        ref={waveRef2}
        className="absolute bottom-0 left-0 w-[200%] h-52 bg-blue-600 opacity-30 rounded-[45%] blur-2xl animate-float" // Slightly higher, less opaque, more blurred
        style={{ transform: "translateX(100%)" }}
      ></div>
      {/* Wave 3: Background, more subtle */}
      <div
        ref={waveRef3}
        className="absolute bottom-0 left-0 w-[200%] h-56 bg-blue-700 opacity-20 rounded-[50%] blur-3xl animate-float" // Highest, least opaque, most blurred
        style={{ transform: "translateX(50%)" }} // Starting position for the third wave
      ></div>

      {/* Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
