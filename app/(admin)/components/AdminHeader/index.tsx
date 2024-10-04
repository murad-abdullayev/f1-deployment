"use client";

import Link from "next/link";
import React from "react";
import { paths } from "@/paths";
import { UserButton } from "@clerk/nextjs";

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-30 shadow-white-lg">
      <nav className="bg-primary-300 border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex-grow flex justify-center">
            <ul className="flex space-x-8 font-medium">
              <li>
                <Link
                  className="block py-2 transition duration-200 text-white hover:opacity-80"
                  href={paths.dashboard.overview}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="block py-2 transition duration-200 text-white hover:opacity-80"
                  href={paths.products}
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="ml-auto">
            <UserButton />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
