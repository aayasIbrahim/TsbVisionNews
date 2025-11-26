"use client";

import React from "react";
import { useGetUsersQuery, useUpdateRoleMutation } from "@/app/redux/features/user/userApi";

type UserRole = "admin" | "user";

interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function User() {
  const { data, isLoading, isError } = useGetUsersQuery();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  const users: User[] = Array.isArray(data?.users) ? data.users : [];

const handleRoleChange = async (id: string, role: UserRole) => {
  console.log("Sending PATCH:", id, role);
  try {
    const res = await updateRole({ id, role }).unwrap();
    console.log("Response:", res);
    alert(`রোল পরিবর্তন হয়েছে: ${role}`);
  } catch (err) {
    console.error("Update Role Error:", err);
    alert("রোল পরিবর্তন ব্যর্থ হয়েছে");
  }
};
  if (isLoading) return <p className="text-gray-700 text-center mt-10">ব্যবহারকারীদের লোড করা হচ্ছে...</p>;
  if (isError) return <p className="text-red-500 text-center mt-10">ব্যবহারকারীদের লোড করতে ব্যর্থ হয়েছে।</p>;
  if (!users.length) return <p className="text-gray-700 text-center mt-10">কোনো ব্যবহারকারী পাওয়া যায়নি।</p>;

  return (
    <section className="bg-white min-h-screen p-6">
      <h1 className="text-gray-900 text-2xl font-semibold mb-6">ব্যবহারকারী পরিচালনা</h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center p-5 rounded-xl bg-gray-100 border border-gray-300 shadow-sm hover:shadow-md transition-all"
          >
            {/* ব্যবহারকারী তথ্য */}
            <div>
              <p className="text-lg text-gray-900 font-semibold">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium inline-block mt-1 ${
                  user.role === "admin" ? "bg-purple-700 text-white" : "bg-green-600 text-white"
                }`}
              >
                {user.role === "admin" ? "অ্যাডমিন" : "ইউজার"}
              </span>
            </div>

            {/* রোল পরিবর্তনের বাটন */}
            <div className="flex gap-2">
              {user.role !== "admin" && (
                <button
                  disabled={isUpdating}
                  onClick={() => handleRoleChange(user._id, "admin")}
                  className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  অ্যাডমিন বানাও
                </button>
              )}

              {user.role !== "user" && (
                <button
                  disabled={isUpdating}
                  onClick={() => handleRoleChange(user._id, "user")}
                  className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition disabled:opacity-50"
                >
                  ইউজার বানাও
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
