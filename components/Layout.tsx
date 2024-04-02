import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default Layout;
