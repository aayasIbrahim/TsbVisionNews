"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdArticle,
  MdCategory,
  MdPeople,
  MdLogout,
  MdMenu,
  MdClose,
  MdHome,
} from "react-icons/md";

interface NavLinkItem {
  id: number;
  label: string;
  icon: React.ElementType;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { id: 1, label: "ড্যাশবোর্ড", icon: MdDashboard, href: "/dashboard" },
  { id: 5, label: "Public Site", icon: MdHome, href: "/" },
  { id: 2, label: "Add News", icon: MdArticle, href: "/addnews" },
  { id: 3, label: "News list", icon: MdCategory, href: "/newslist" },
  { id: 4, label: "User", icon: MdPeople, href: "/users" },
];

const AdminNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const LinkItem: React.FC<{ link: NavLinkItem }> = ({ link }) => {
    const isActive = currentPath.startsWith(link.href);
    const Icon = link.icon;

    return (
      <a
        href={link.href}
        className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition duration-200 whitespace-nowrap ${
          isActive
            ? "bg-green-600 text-white shadow-md"
            : "text-gray-800 hover:bg-gray-200"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span>{link.label}</span>
      </a>
    );
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-xl font-bold">
          <MdArticle className="text-green-600 w-6 h-6" />
          <span className="font-extrabold tracking-[1px] text-lg">TSB</span>
          <span className="text-blue-600 font-semibold text-lg ml-2">
            VISION
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-4">
          {NAV_LINKS.map((link) => (
            <LinkItem key={link.id} link={link} />
          ))}

          <button
            onClick={() => console.log("Logging out...")}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100 rounded-md"
          >
            <MdLogout className="w-5 h-5" />
            <span>লগ আউট</span>
          </button>
        </nav>

        {/* Mobile Button */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <MdClose className="w-6 h-6" />
          ) : (
            <MdMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col p-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <LinkItem key={link.id} link={link} />
            ))}

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100 rounded-md"
            >
              <MdLogout className="w-5 h-5" />
              <span>লগ আউট</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminNavbar;
