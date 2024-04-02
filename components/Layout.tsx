import React, { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/router";

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
