
import React, { FC } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: FC<React.SVGProps<SVGSVGElement>>;
  color: string; // Tailwind color e.g. "blue-500"
  trend?: number; // optional percentage trend
  footer?: string; // optional footer text
}

const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  icon: IconComponent,
  color,
  trend,
  footer,
}) => {
  const textColor = `text-${color}`;
  const bgSoft = `bg-${color.replace("500", "100")}`;
  const bgIcon = `bg-${color}/10`;
  const ringIcon = `ring-${color}/30`;

  const trendColor =
    trend && trend > 0
      ? "text-green-600"
      : trend && trend < 0
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div className="p-9 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition duration-300 group h-[300px]">
      <div className="flex items-center justify-between">
        {/* Icon Wrapper */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-2xl ${bgIcon} ${textColor} ring-4 ${ringIcon} group-hover:scale-105 transition`}
        >
          <IconComponent className="w-7 h-7" />
        </div>

        {/* Numeric Value */}
        <div className="text-right">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`mt-1 text-4xl font-bold tracking-tight ${textColor}`}>
            {value}
          </p>
        </div>
      </div>

      {/* Trend Section */}
      {trend !== undefined && (
        <div className="mt-4 flex items-center space-x-2">
          <span className={`text-sm font-semibold ${trendColor}`}>
            {trend > 0
              ? `▲ ${trend}%`
              : trend < 0
              ? `▼ ${Math.abs(trend)}%`
              : "0%"}
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
      )}

      {/* Optional Footer */}
      {footer && (
        <div
          className={`mt-4 p-2 rounded-lg text-xs font-medium ${bgSoft} ${textColor}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
