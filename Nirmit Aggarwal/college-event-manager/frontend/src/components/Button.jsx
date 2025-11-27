import { useButtonPressAnimation } from "../hooks/useAnimation";

export function Button({ children, variant = "primary", ...props }) {
  const buttonRef = useButtonPressAnimation();

  const variants = {
    primary: "btn-brutalist-yellow",
    secondary: "btn-brutalist",
    success: "btn-brutalist-green",
    purple: "btn-brutalist-purple",
  };

  return (
    <button
      ref={buttonRef}
      className={`${variants[variant]} cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}
