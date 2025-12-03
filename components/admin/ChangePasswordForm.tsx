"use client";

import { useState } from "react"

export default function ChangePasswordForm() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      return setError("নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!");
    }

    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে।");
    } else {
      setSuccess("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <>
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Current Password */}
        <div>
          <label className="block mb-1">বর্তমান পাসওয়ার্ড</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block mb-1">নতুন পাসওয়ার্ড</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1">কনফার্ম পাসওয়ার্ড</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Error & Success Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded "
        >
          Update Password
        </button>
      </form>
    </div>

    </>
  );
}
