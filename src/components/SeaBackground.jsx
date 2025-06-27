// react-pf/src/components/SeaBackground.jsx
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const SeaBackground = () => {
  const [bubbles, setBubbles] = useState([]);

  const waveRef1 = useRef(null);
  const waveRef2 = useRef(null);
  const waveRef3 = useRef(null);

  useEffect(() => {
    generateBubbles();
    const handleResize = () => generateBubbles();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    const waveMotion = (ref, x = "-100%", duration = 30, delay = 0) => {
      gsap.to(ref, {
        x,
        duration,
        ease: "none",
        repeat: -1,
        delay,
      });
    };

    if (waveRef1.current && waveRef2.current && waveRef3.current) {
      waveMotion(waveRef1.current, "-100%", 25, 0);
      waveMotion(waveRef2.current, "-100%", 30, 12.5);
      waveMotion(waveRef3.current, "-100%", 40, 8);
    }
  }, []);

  const generateBubbles = () => {
    const count = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    const newBubbles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 12 + 6,
      x: Math.random() * 100,
      y: Math.random() * 30 + 70,
      duration: Math.random() * 8 + 4,
      blur: Math.random() * 3,
      opacity: Math.random() * 0.6 + 0.4,
    }));
    setBubbles(newBubbles);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Ocean Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-blue-800 dark:from-sky-900 dark:to-blue-950 transition-all duration-500" />

      {/* Waves */}
      <div
        ref={waveRef1}
        className="wave-layer bg-blue-400/30 blur-2xl h-40 rounded-[40%]"
      />
      <div
        ref={waveRef2}
        className="wave-layer bg-blue-500/20 blur-[60px] h-48 rounded-[45%]"
      />
      <div
        ref={waveRef3}
        className="wave-layer bg-blue-600/10 blur-[80px] h-52 rounded-[50%]"
      />

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
            animationDuration: `${bubble.duration}s`,
            filter: `blur(${bubble.blur}px)`,
            opacity: bubble.opacity,
          }}
        />
      ))}
    </div>
  );
};
