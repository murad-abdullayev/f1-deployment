"use client";

import { useTableLayout } from "@/app/hooks/set-table-layout";
import Image from "next/image";
import React from "react";
import { FaCarAlt, FaFill, FaGasPump } from "react-icons/fa";

interface Car {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rentalPrice: number;
  description: string;
  fuel: string;
  transmission: string;
  brand: string;
  engine: number;
  year: number;
  class: string;
  available: boolean;
}

const CarItem = ({ car }: { car: Car }) => {
  const { tableLayout } = useTableLayout();
  return (
    <>
      {tableLayout ? (
        <div className=" relative pt-[40px] pr-[40px] pb-[50px] pl-[40px] shadow-custom rounded-2xl bg-white cursor-pointer hover:scale-95 transition duration-300">
          <Image
            width={333}
            height={250}
            className="object-cover h-[250px]"
            src={car.imageUrl}
            alt={car.name}
          />
          <h3 className="text-2xl font-bold mt-[20px] mb-[5px]">{car.name}</h3>
          <div className="mb-[20px] text-slate-500">
            <span className="text-2xl font-bold text-primary-400">
              ${car.rentalPrice}
            </span>
            / day
          </div>
          <div className="text-slate-500 text-sm flex flex-col gap-2 mb-[30px]">
            <div className="flex items-center gap-5">
              <FaFill color="red" /> {car.engine} L
            </div>
            <div className="flex items-center gap-5">
              <FaCarAlt color="red" />
              {car.transmission}
            </div>
            <div className="flex items-center gap-5">
              <FaGasPump color="red" />
              {car.fuel}
            </div>
          </div>
          <div className="flex justify-between">
            <button className="rounded-3xl bg-black py-[15px] px-[40px] text-white border-[1px] border-transparent duration-300 transition hover:text-primary-500 hover:bg-transparent hover:border-primary-500">
              Rent now
            </button>
          </div>
        </div>
      ) : (
        <div className="py-4 px-6 bg-white shadow-custom rounded-xl mb-4 flex flex-col gap-4 cursor-pointer hover:scale-95 transition duration-300">
          <h3 className="text-lg font-bold">{car.name}</h3>
          <div className="flex items-center gap-4">
            <Image
              width={100}
              height={100}
              className="object-cover rounded-lg"
              src={car.imageUrl}
              alt={car.name}
            />
            <div className="flex-grow">
              <div className="mb-[5px] text-sm text-slate-500">
                <span className="font-bold text-lg text-primary-400">
                  ${car.rentalPrice}
                </span>
                / day
              </div>
              <ul className="text-slate-500 text-sm flex flex-col gap-1">
                <li className="flex items-center gap-[10px]">
                  <FaFill color="red" />
                  {car.engine} L
                </li>
                <li className="flex items-center gap-[10px]">
                  <FaCarAlt color="red" />
                  {car.transmission}
                </li>
                <li className="flex items-center gap-[10px]">
                  <FaGasPump color="red" />
                  {car.fuel}
                </li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <button className="rounded-full bg-black py-2 px-6 text-white transition hover:text-primary-500 hover:bg-transparent hover:border-primary-500 border border-transparent">
                Rent now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarItem;
