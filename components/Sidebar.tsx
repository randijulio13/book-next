import React, { ReactNode, useEffect } from "react";
import swal from "@/libs/sweetalert";
import useAuthStore from "@/stores/auth";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

interface SidebarProps {
  closeMenu: () => void;
  showMenu: boolean;
}

const Sidebar = ({ closeMenu, showMenu }: SidebarProps) => {
  const { accessToken, setAccessToken } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {}, []);

  const logout = async () => {
    let { isConfirmed } = await swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      confirmButtonText: "Logout",
      showCancelButton: true,
    });

    if (!isConfirmed) return;
    setAccessToken("");
  };
  return (
    <div className="w-full h-full bg-white shadow-xl border-r">
      <div className="flex flex-col gap-4 p-2 h-full relative">
        <AnimatePresence>
          {showMenu && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 end-2 text-2xl w-8 h-8 flex items-center justify-center hover:bg-gray-100 duration-200"
              onClick={closeMenu}
            >
              <IoMdClose />
            </motion.button>
          )}
        </AnimatePresence>
        <h1 className="text-center font-bold text-4xl mt-8">Book Library</h1>
        <div className="flex flex-col gap-2">
          <Link
            href="/books"
            className={classNames("p-4 hover:bg-gray-100 duration-200", {
              "bg-gray-800 hover:!bg-black text-white": pathname == "/books",
            })}
          >
            Book
          </Link>
          <Link
            href="/categories"
            className={classNames("p-4 hover:bg-gray-100 duration-200", {
              "bg-gray-800 hover:!bg-black text-white":
                pathname == "/categories",
            })}
          >
            Category
          </Link>
        </div>
        <div className="mt-auto"></div>
        {accessToken ? (
          <button
            className="w-full px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200 active:scale-95"
            onClick={() => logout()}
          >
            Logout
          </button>
        ) : (
          <Link href={"/login"}>
            <button className="px-4 py-2 w-full bg-gray-800 text-white hover:bg-black duration-200 active:scale-95">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
