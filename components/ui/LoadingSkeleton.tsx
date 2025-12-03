// components/ui/LoadingSkeleton.tsx
import React from "react";

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ className }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-md ${className}`}
    ></div>
  );
};

export default LoadingSkeleton;
