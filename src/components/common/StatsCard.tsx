// StatsCard.tsx
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<any>;
  trend?: string;
  description?: string;
  gradient?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  description,
  gradient = false,
}) => {
  return (
    <div
      className={`p-6 rounded-2xl ${gradient ? "bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 border border-blue-200" : "bg-white"} shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-100">
          {/* Icon placeholder - can add icons later if needed */}
          <div className="h-6 w-6 bg-blue-500 rounded"></div>
        </div>
        {trend && (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              trend.startsWith("+")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
