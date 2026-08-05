import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import birdLogo from "../assets/BirdLogo.png";

const BRAND = "HAIERAH".split("");

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const screenRef = useRef(null);

  // Scene 1
  const scene1Ref = useRef(null);
  const logoRef = useRef(null);
  const shineRef = useRef(null);

  // Scene 2
  const scene2Ref = useRef(null);
  const letterRefs = useRef([]);
  letterRefs.current = [];

  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const letters = letterRefs.current.filter(Boolean);

      //---------------------------------------
      // Initial State
      //---------------------------------------

      gsap.set(scene2Ref.current, {
        opacity: 0,
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.25,
        rotation: -12,
        filter: "blur(18px)",
      });

      gsap.set(shineRef.current, {
        x: "-150%",
      });

      gsap.set(letters, {
        opacity: 0,
        x: -60,
        filter: "blur(12px)",
      });

      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 15,
      });

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      //---------------------------------------
      // Timeline
      //---------------------------------------

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      //---------------------------------------
      // SCENE 1
      //---------------------------------------

      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "expo.out",
      });

      tl.to(
        shineRef.current,
        {
          x: "170%",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.55"
      );

      tl.to(logoRef.current, {
        y: -10,
        duration: 0.45,
        ease: "sine.inOut",
      });

      tl.to(logoRef.current, {
        y: 0,
        duration: 0.45,
        ease: "sine.inOut",
      });

      tl.to({}, { duration: 0.3 });

      //---------------------------------------
      // Bird disappears
      //---------------------------------------

      tl.to(scene1Ref.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.45,
        ease: "power2.out",
      });

      //---------------------------------------
      // Scene 2 appears
      //---------------------------------------

      tl.set(scene2Ref.current, {
        opacity: 1,
      });
            //---------------------------------------
      // HAIERAH Letters
      //---------------------------------------

      tl.to(
        letters,
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      //---------------------------------------
      // Loading Line
      //---------------------------------------

      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power2.inOut",
        },
        "-=0.35"
      );

      //---------------------------------------
      // Luxury Fashion
      //---------------------------------------

      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.65"
      );

      //---------------------------------------
      // Hold
      //---------------------------------------

      tl.to({}, { duration: 0.8 });

      //---------------------------------------
      // Fade Scene 2
      //---------------------------------------

      tl.to(scene2Ref.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      //---------------------------------------
      // Reveal Home Page
      //---------------------------------------

      tl.to(screenRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          setFinished(true);
          onComplete?.();
        },
      });

    }, containerRef);

    return () => ctx.revert();

  }, [onComplete]);

  if (finished) return null;
  return (
  <div
    ref={containerRef}
    className="fixed inset-0 z-[9999] overflow-hidden"
  >
    <div
      ref={screenRef}
      className="relative w-full h-full bg-white overflow-hidden"
    >

      {/* ========================= */}
      {/* Scene 1 - Bird Logo */}
      {/* ========================= */}

      <div
        ref={scene1Ref}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative">

          {/* Bird Logo */}

          <div className="relative w-72 h-72 md:w-[24rem] md:h-[24rem] lg:w-[30rem] lg:h-[30rem]">

            <img
              ref={logoRef}
              src={birdLogo}
              alt="Bird Logo"
              className="w-full h-full object-contain select-none"
            />

            {/* Shine */}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">

              <div
                ref={shineRef}
                className="
                  absolute
                  top-0
                  left-[-40%]
                  h-full
                  w-20
                  rotate-[25deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/90
                  to-transparent
                "
              />

            </div>

          </div>

        </div>
      </div>

      {/* ========================= */}
      {/* Scene 2 - Brand */}
      {/* ========================= */}

      <div
        ref={scene2Ref}
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          px-6
        "
      >

        <h1
          className="
            flex
            text-6xl
            md:text-8xl
            lg:text-9xl
            font-semibold
            text-black
            tracking-[0.30em]
            select-none
          "
          style={{
            fontFamily: '"Cormorant Garamond", serif'
          }}
        >
          {BRAND.map((letter, index) => (

            <span
              key={index}
              ref={(el) => (letterRefs.current[index] = el)}
              className="inline-block"
            >
              {letter}
            </span>

          ))}
        </h1>

        {/* Luxury Fashion */}

        <p
          ref={subtitleRef}
          className="
            mt-6
            uppercase
            text-xs
            tracking-[0.55em]
            text-neutral-500
          "
        >
          Luxury Fashion
        </p>

        {/* Loading Line */}

        <div className="mt-8 w-56 h-[1px] bg-neutral-200 overflow-hidden">

          <div
            ref={lineRef}
            className="w-full h-full bg-black"
          />

        </div>

      </div>

    </div>
  </div>
);
}