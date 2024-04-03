import React, { ReactNode, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/router";
import {
  LayoutContext,
  ILayoutContext,
  LayoutContextProvider,
} from "@/contexts/LayoutContext";
import { FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { loading } = useContext(LayoutContext) as ILayoutContext;

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/30 flex items-center justify-center absolute h-screen w-screen z-50"
          >
            <span className="animate-spin text-4xl">
              <FaSpinner />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="w-screen h-screen overflow-hidden">
        <div className="fixed w-full">
          <Navbar />
        </div>
        <div className="pt-20">{children}</div>
      </div>
    </>
  );
};

export default Layout;
