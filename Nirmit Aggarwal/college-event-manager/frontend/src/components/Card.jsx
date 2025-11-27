import { useCardHoverAnimation } from "../hooks/useAnimation";

export function Card({ children, ...props }) {
  const cardRef = useCardHoverAnimation();

  return (
    <div ref={cardRef} className="card-brutalist" {...props}>
      {children}
    </div>
  );
}
