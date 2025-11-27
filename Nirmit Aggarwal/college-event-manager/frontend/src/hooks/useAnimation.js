import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGSAPAnimation(deps = []) {
  const element = useRef(null);

  useEffect(() => {
    if (!element.current) return;

    // Stagger entrance animation
    gsap.from(element.current, {
      duration: 0.5,
      y: 20,
      opacity: 0,
      ease: "power2.out",
    });
  }, deps);

  return element;
}

export function useCardHoverAnimation() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        duration: 0.2,
        y: -8,
        boxShadow: "12px 12px 0px rgba(0, 0, 0, 1)",
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.2,
        y: 0,
        boxShadow: "8px 8px 0px rgba(0, 0, 0, 1)",
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return cardRef;
}

export function useButtonPressAnimation() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseDown = () => {
      gsap.to(button, {
        duration: 0.05,
        y: 4,
        boxShadow: "4px 4px 0px rgba(0, 0, 0, 1)",
        ease: "power2.out",
      });
    };

    const handleMouseUp = () => {
      gsap.to(button, {
        duration: 0.1,
        y: 0,
        boxShadow: "8px 8px 0px rgba(0, 0, 0, 1)",
        ease: "power2.out",
      });
    };

    button.addEventListener("mousedown", handleMouseDown);
    button.addEventListener("mouseup", handleMouseUp);
    button.addEventListener("mouseleave", handleMouseUp);

    return () => {
      button.removeEventListener("mousedown", handleMouseDown);
      button.removeEventListener("mouseup", handleMouseUp);
      button.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);

  return buttonRef;
}

export function usePageTransition() {
  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.from(pageRef.current, {
      duration: 0.4,
      x: 50,
      opacity: 0,
      ease: "power2.out",
    });
  }, []);

  return pageRef;
}
