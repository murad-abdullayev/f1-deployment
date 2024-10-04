import ProductsHeader from "@/app/components/ProductsHeader";
import CarItem from "@/app/components/CarItem";
import prisma from "@/app/db";
import React from "react";
import TableLayout from "@/app/components/TableLayout";
import { SortOrder } from "@/app/types";

type Props = {
  searchParams: {
    sort: SortOrder;
    [key: string]: string;
  };
};

const Products = async ({ searchParams }: Props) => {
  const orderBy: Record<string, string> = {};
  const { sort, ...filters } = searchParams;
  if (searchParams.sort) {
    const searchKey = searchParams.sort.split("_")[0];
    const searchValue = searchParams.sort.split("_")[1];
    orderBy[searchKey] = searchValue;
  } else {
    orderBy.createdAt = "desc";
  }

  const filter: Record<string, any> = {};

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      filter[key] = {
        in: Array.isArray(filters[key]) ? filters[key] : [filters[key]],
      };
    }
  });

  const products = await prisma.car.findMany({
    where: {
      ...filter,
      available: true,
    },
    orderBy,
  });

  return (
    <>
      <ProductsHeader />
      <p className="text-primary-400 text-center mt-[80px] text-xl mb-[20px]">
        Formula One Rent A Car
      </p>
      <h2 className="text-[42px] text-center font-bold mb-[20px]">
        Daily, weekly and monthly rental of cars
      </h2>
      <TableLayout cars={products}>
        <div className="pb-10 flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-5">
            {products.map((product) => (
              <CarItem key={product.id} car={product} />
            ))}
          </div>
        </div>
      </TableLayout>
    </>
  );
};

export default Products;
