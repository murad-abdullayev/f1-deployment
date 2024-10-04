import Link from "next/link";
import React from "react";

const MainHome = () => {
  return (
    <main className="flex-grow text-white relative py-32 px-32 bg-[url(./assets/home-bg.jpg)] bg-cover bg-center bg-no-repeat bg-fixed">
      <h1 className="font-bold text-7xl mb-7">Need to rent a car?</h1>
      <p className="w-[550px]">
        Formula One Rent A Car's wide fleet of vehicles allows us to provide you
        with any type of rental car at any time.
      </p>
      <p className="mt-7">Prices start from</p>
      <div className="mt-7 relative w-fit">
        <h3 className="text-5xl font-bold">₼ 49</h3>
        <span className="absolute text-2xl font-bold right-[-80px] top-0 text-primary-500">
          / day
        </span>
      </div>
      <Link href={"/products"}>
        <button className="px-12 py-4 rounded-3xl border-[1px] border-transparent duration-300 bg-primary-700 mt-7 transition hover:bg-transparent hover:border-white">
          Rent a car
        </button>
      </Link>
    </main>
  );
};

export default MainHome;
