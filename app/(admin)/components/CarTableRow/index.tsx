"use client";
import Swal from "sweetalert2";

import React from "react";
import { deleteCar } from "@/app/actions/car";
const CarTableRow = ({ car, columns }: { car: any; columns: any[] }) => {
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return `${words.slice(0, wordLimit).join(" ")}...`;
    }
    return text;
  };

  const truncateWord = (word: string, lettersLimit: number) => {
    if (word.length > lettersLimit) {
      return `${word.slice(0, lettersLimit)}...`;
    }
    return word;
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDelete = async () => {
    Swal.fire({
      title: `Delete car "${car.name}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCar(car.id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Car has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      {columns.map((col) => {
        const value = car[col.key as keyof typeof car];
        if (col.key === "id") {
          return (
            <td
              key={col.key}
              className="px-6 py-4 cursor-pointer"
              onClick={() => copyToClipboard(value as string)}
              title="Click to copy full car id"
            >
              {truncateWord(value as string, 7)}
            </td>
          );
        }
        if (col.key === "image") {
          return (
            <td key={col.key} className="py-4">
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-20 h-20 object-cover rounded"
              />
            </td>
          );
        }

        if (col.key === "description") {
          return (
            <td
              key={col.key}
              className="px-6 py-4 cursor-pointer"
              onClick={() => copyToClipboard(value as string)}
              title="Click to copy full description"
            >
              {truncateText(value as string, 6)}
            </td>
          );
        }

        if (col.key === "imageUrl") {
          return (
            <td
              key={col.key}
              className="px-6 py-4 cursor-pointer"
              onClick={() => copyToClipboard(value as string)}
              title="Click to copy full image URL"
            >
              {truncateWord(value as string, 20)}
            </td>
          );
        }

        return (
          <td key={col.key} className="px-6 py-4">
            {value?.toString()}
          </td>
        );
      })}

      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={handleDelete}
          className="font-medium text-primary-500 dark:text-blue-500 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CarTableRow;
