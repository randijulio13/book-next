import React, { ReactNode, useContext, useEffect, useState } from "react";
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
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import classNames from "classnames";
import { IoMdClose } from "react-icons/io";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { loading } = useContext(LayoutContext) as ILayoutContext;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/30 flex items-center justify-center absolute inset-0 h-screen w-screen z-50"
          >
            <span className="animate-spin text-4xl">
              <FaSpinner />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <div
          className={classNames(
            "fixed lg:translate-x-0 duration-200 w-72 h-screen z-10",
            {
              "-translate-x-72": !showMenu,
              "translate-x-0": showMenu,
            }
          )}
        >
          <Sidebar closeMenu={closeMenu} showMenu={showMenu} />
        </div>
        <AnimatePresence>
          {showMenu && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-screen h-screen fixed z-10 bg-black/50"></motion.div>
          )}
        </AnimatePresence>
        <div className="lg:ps-72 lg:hidden">
          <div className="px-4 pt-4">
            <button
              onClick={() => setShowMenu((menu) => !menu)}
              className="text-2xl w-12 h-12 flex items-center justify-center hover:bg-gray-100 duration-200"
            >
              <FaBars />
            </button>
          </div>
        </div>
        <div className="duration-200 lg:ps-72">{children}</div>
      </div>
    </>
  );
};

export default Layout;
