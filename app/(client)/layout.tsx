import React, { PropsWithChildren } from "react";
import Header from "../components/Header";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
      </div>
    </>
  );
};

export default ClientLayout;
