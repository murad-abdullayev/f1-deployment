"use server";

import { Car } from "@prisma/client";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";

export async function createCar({
  data,
}: {
  data: Omit<Car, "id" | "createdAt" | "updatedAt">;
}) {
  const car = await prisma.car.create({
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
      price: data.price,
      rentalPrice: data.rentalPrice,
      description: data.description,
      fuel: data.fuel,
      transmission: data.transmission,
      brand: data.brand,
      engine: data.engine,
      year: data.year,
      class: data.class,
      available: data.available,
    },
  });

  revalidatePath(paths.dashboard.overview);
  return car;
}

export async function deleteCar(id: string) {
  await prisma.car.delete({
    where: { id },
  });
  revalidatePath(paths.dashboard.overview);
  return { success: true };
}

export async function updateCar(id: string, data: Car) {
  await prisma.car.update({
    where: { id },
    data,
  });
  revalidatePath(paths.dashboard.overview);
  return { success: true };
}
