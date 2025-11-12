// Home.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import icon from "../assets/buttin-icon-shrunk.jpg";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReduced) {
        gsap.fromTo(
          ".company-title",
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }
        );

        gsap.fromTo(
          ".caption_1920",
          { y: 16, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => gsap.set(".caption_1920", { clearProps: "transform" }),
          }
        );
      } else {
        gsap.set([".company-title", ".caption_1920"], { opacity: 1, clearProps: "transform" });
      }

      gsap.utils.toArray(".reveal-left,.reveal-right,.reveal-up,.reveal-scale").forEach((el) => {
        if (el.classList.contains("caption_1920")) return;

        if (!prefersReduced) {
          if (el.classList.contains("reveal-up")) gsap.set(el, { opacity: 0, y: 24 });
          if (el.classList.contains("reveal-left")) gsap.set(el, { opacity: 0, x: -24 });
          if (el.classList.contains("reveal-right")) gsap.set(el, { opacity: 0, x: 24 });
          if (el.classList.contains("reveal-scale")) gsap.set(el, { opacity: 0, scale: 0.96 });

          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
            onComplete: () => gsap.set(el, { clearProps: "transform" }),
          });
        } else {
          gsap.set(el, { opacity: 1, clearProps: "transform" });
        }
      });

      document.querySelectorAll(".triangle-overlay line, .triangle-overlays line").forEach((line) => {
        const len = line.getTotalLength();
        line.style.strokeDasharray = `${len}`;
        line.style.strokeDashoffset = `${len}`;
        if (!prefersReduced) {
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line.closest(".triangle-wrapper") ?? line,
              start: "top 85%",
              once: true,
            },
          });
        } else {
          gsap.set(line, { strokeDashoffset: 0 });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root}>
      {/* LEFT TRIANGLE + CTA */}
      <div className="triangle-wrapper reveal-left">
        <svg className="triangle-overlays" viewBox="0 0 602 602" width="602" height="602" preserveAspectRatio="none">
          <line x1="602" y1="0" x2="0" y2="301" stroke="black" strokeWidth="2" />
          <line x1="0" y1="301" x2="602" y2="602" stroke="black" strokeWidth="2" />
        </svg>
        <Link to="/Intro" className="btn_1920">
          <img src={icon} alt="" />
          <div className="discover">Discover A.I.</div>
        </Link>
      </div>

      {/* CENTER TITLE */}
      <div className="company-title reveal-scale">Sophisticated skincare</div>

      {/* RIGHT TRIANGLE + CTA */}
      <div className="triangle-wrapper reveal-right">
        <svg className="triangle-overlay" viewBox="0 0 602 602" width="602" height="602" preserveAspectRatio="none">
          <line x1="602" y1="0" x2="0" y2="301" stroke="black" strokeWidth="2" />
          <line x1="0" y1="301" x2="602" y2="602" stroke="black" strokeWidth="2" />
        </svg>
        <Link to="/Intro" className="btn_1920">
          <div className="discover">Take the Test</div>
          <img src={icon} className="rotated-image" alt="" />
        </Link>
      </div>

      {/* BOTTOM-LEFT CAPTION */}
      <div className="caption_1920" aria-label="Skinstric caption">
        <p>
          Skinstric developed an A.I. that creates a<br />
          highly-personalized routine tailored to<br />
          what your skin needs.
        </p>
      </div>
    </section>
  );
};

export default Home;
