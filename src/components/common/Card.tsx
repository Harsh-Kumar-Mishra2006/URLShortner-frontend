// Card.tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = "",
  hover = false,
  padding = "md",
}) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    none: "p-0",
  };

  const hoverClass = hover
    ? "hover:shadow-xl transition-shadow duration-300"
    : "";

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 ${paddingClasses[padding]} ${hoverClass} ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="text-gray-700">{children}</div>

      {footer && (
        <div className="mt-6 pt-6 border-t border-gray-200">{footer}</div>
      )}
    </div>
  );
};

export default Card;
