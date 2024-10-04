import React from "react";

const ProductsHeader = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-60 z-10 shadow-white-lg"></div>
      <div className="relative bg-[url(./assets/products-bg.jpg)] bg-cover bg-[center_60%] pt-[80px] pb-[160px] z-0"></div>
      <h1 className="z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white absolute text-5xl font-bold">
        Rental Cars
      </h1>
    </div>
  );
};

export default ProductsHeader;
