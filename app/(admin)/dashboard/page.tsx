
"use client";
import React from "react";
import MetricCard from "@/components/admin/MetricCard";
import { FiFileText, FiFolder, FiMonitor, FiUsers } from "react-icons/fi";
import { useGetNewsQuery } from "@/app/redux/features/news/newsApi";

const Dashboard = () => {
  const {
    data: newsData,
    isLoading: isNewsLoading,
    isError: isNewsError,
  } = useGetNewsQuery("all");

  const isLoading = isNewsLoading;
  const isError = isNewsError;

  const totalNewsCount = newsData?.totalCount || 0;

  if (isLoading) {
    return (
      <div className="p-6 text-lg font-medium text-blue-600">
        Loading dashboard metrics...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-lg font-medium text-red-600">
        Error fetching dashboard data. Please try again.
      </div>
    );
  }

  // 4. Component Render
  return (
    <section>
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Admin Overview
        </h1>

        {/* 5. The Metric Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total News Card */}
          <MetricCard
            title="Total News"
            value={totalNewsCount.toLocaleString()}
            icon={FiFileText}
            color="blue-500"
          />

          {/* Total Categories Card */}
          <MetricCard
            title="Total Categories"
            value={7}
            icon={FiFolder}
            color="green-500"
          />

          <MetricCard title="ADS" value={0} icon={FiMonitor} color="teal-500" />

          <MetricCard
            title="Total User"
            value={1}
            icon={FiUsers}
            color="red-500"
          />

          {/* You can add more cards here */}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
