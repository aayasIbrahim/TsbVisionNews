// components/ui/FullScreenLoading.tsx
import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const FullScreenLoading: React.FC = () => {
  return (
    <div className=" flex flex-col items-center justify-center bg-white z-50">
      {/* Main Hero Skeleton */}
      <LoadingSkeleton className="h-64 w-[90%] max-w-4xl mb-6" />

      {/* Standard Articles Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] max-w-6xl mb-6">
        {[1, 2, 3].map((i) => (
          <LoadingSkeleton key={i} className="h-40 w-full" />
        ))}
      </div>

      {/* Most Read Sidebar Skeleton */}
      <div className="w-[90%] max-w-4xl">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <LoadingSkeleton key={i} className="h-16 w-full mb-2" />
        ))}
      </div>
    </div>
  );
};

export default FullScreenLoading;
