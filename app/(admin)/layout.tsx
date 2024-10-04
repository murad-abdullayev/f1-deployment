import React from "react";
import { PropsWithChildren } from "react";
import AdminHeader from "./components/AdminHeader";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
