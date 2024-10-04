import prisma from "@/app/db";
import { paths } from "@/paths";
import { auth } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import CarTableRow from "../components/CarTableRow";
import { Button } from "@/components/ui/button";
import { CreateCarDialog } from "../components/CreateCarDialog";

const columns = [
  { key: "name", label: "Car Name" },
  { key: "id", label: "Car ID" },
  { key: "image", label: "Image" },
  { key: "imageUrl", label: "Image URL" },
  { key: "price", label: "Price" },
  { key: "rentalPrice", label: "Rental Price" },
  { key: "fuel", label: "Fuel" },
  { key: "transmission", label: "Transmission" },
  { key: "brand", label: "Brand" },
  { key: "engine", label: "Engine" },
  { key: "year", label: "Year" },
  { key: "class", label: "Class" },
  { key: "available", label: "Available" },
  { key: "description", label: "Description" },
];

const Dashboard = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect(paths.auth.signIn);
  }

  const user = await prisma.user.findUnique({
    where: { externalId: userId },
  });

  if (user?.role !== Role.ADMIN) {
    redirect(paths.home);
  }

  const cars = await prisma.car.findMany();

  return (
    <>
      <div className="p-10 flex flex-col gap-5 items-center">
        <div className="flex items-center justify-between w-full">
          <h1 className="self-start font-bold text-4xl text-primary-300">
            Cars Dashboard
          </h1>
          <CreateCarDialog />
        </div>
        <div className="relative overflow-scroll w-[1300px] h-[450px] shadow-xl sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="sticky top-0 bg-gray-50 dark:bg-gray-700 z-10">
                {columns.map((col) => (
                  <th key={col.key} scope="col" className="px-6 py-3">
                    <div className="flex items-center">{col.label}</div>
                  </th>
                ))}
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <CarTableRow key={car.id} car={car} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
