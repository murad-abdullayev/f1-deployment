"use client";

import React, { PropsWithChildren, use, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { SortOrder } from "@/app/types";
import qs from "query-string";
import queryString from "query-string";
import { paths } from "@/paths";
import { useRouter, useSearchParams } from "next/navigation";
import { Car } from "@prisma/client";
import { useTableLayout } from "@/app/hooks/set-table-layout";

const sortOptions = [
  { name: "Newest", slug: SortOrder.DATE_DESC, current: false },
  { name: "Price: Low to High", slug: SortOrder.PRICE_ASC, current: false },
  { name: "Price: High to Low", slug: SortOrder.PRICE_DESC, current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
// const filters = [
//   {
//     id: "category",
//     name: "Category",
//     options: [
//       { value: "new-arrivals", label: "New Arrivals", checked: false },
//       { value: "sale", label: "Sale", checked: false },
//       { value: "travel", label: "Travel", checked: true },
//       { value: "organization", label: "Organization", checked: false },
//       { value: "accessories", label: "Accessories", checked: false },
//     ],
//   },
// ];

type TFilter = {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    checked: boolean;
  }[];
}[];

type Props = {
  children: React.ReactNode;
  cars: Car[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TableLayout({ children, cars }: Props) {
  const { tableLayout, setToggleLayout } = useTableLayout();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<TFilter>([
    {
      id: "fuel",
      name: "Fuel",
      options: Array.from(new Set(cars.map((car) => car.fuel))).map((fuel) => ({
        value: fuel,
        label: fuel,
        checked: false,
      })),
    },
    {
      id: "transmission",
      name: "Transmission",
      options: Array.from(new Set(cars.map((car) => car.transmission))).map(
        (transmission) => ({
          value: transmission,
          label: transmission,
          checked: false,
        })
      ),
    },
    {
      id: "brand",
      name: "Brand",
      options: Array.from(new Set(cars.map((car) => car.brand))).map(
        (brand) => ({
          value: brand,
          label: brand,
          checked: false,
        })
      ),
    },
    {
      id: "class",
      name: "Class",
      options: Array.from(new Set(cars.map((car) => car.class))).map(
        (carClass) => ({
          value: carClass,
          label: carClass,
          checked: false,
        })
      ),
    },
  ]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const sortOrder = searchParams.get("sort");
  const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder>(
    sortOrder ? (sortOrder as SortOrder) : SortOrder.DATE_DESC
  );

  function handleSortChange(sortOrder: SortOrder) {
    setSelectedSortOrder(sortOrder);
    const query = {
      sort: sortOrder,
    };
    const url = queryString.stringifyUrl({
      url: paths.products,
      query,
    });
    router.push(url);
  }

  function handleFilterChange(
    filterId: string,
    value: string,
    optionIdx: number
  ) {
    const filter = filters.find((f) => f.id === filterId);
    if (!filter) return;
    filter.options[optionIdx].checked = !filter.options[optionIdx].checked;
    setFilters([...filters]);
  }

  useEffect(() => {
    const query: Record<string, string | string[]> = {};
    query.sort = selectedSortOrder;
    filters.forEach((section) => {
      const options = section.options
        .filter((option) => option.checked)
        .map((option) => option.value);
      if (options.length) {
        query[section.id] = options;
      }
    });

    const url = qs.stringifyUrl({
      url: "/products",
      query,
    });

    router.push(url);
  }, [filters, selectedSortOrder]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {/* <h3 className="sr-only">Categories</h3> */}
                {/* <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul> */}

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              onChange={() =>
                                handleFilterChange(
                                  section.id,
                                  option.value,
                                  optionIdx
                                )
                              }
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1
              id="cars-heading"
              className="text-4xl font-bold tracking-tight text-gray-900"
            >
              Cars
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => handleSortChange(option.slug)}
                          className={classNames(
                            option.slug === selectedSortOrder
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 w-full text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                onClick={() => setToggleLayout()}
              >
                <span className="sr-only">View grid</span>
                {tableLayout ? (
                  <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Bars3Icon aria-hidden="true" className="h-5 w-5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {/* {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))} */}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              onChange={() =>
                                handleFilterChange(
                                  section.id,
                                  option.value,
                                  optionIdx
                                )
                              }
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
              <div className="lg:col-span-3">{children}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
