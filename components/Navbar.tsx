import swal from "@/libs/sweetalert";
import useAuthStore from "@/stores/auth";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";

const Navbar = () => {
  const { accessToken, setAccessToken } = useAuthStore();

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
    <nav className="h-20 bg-white shadow w-full flex items-center px-4 gap-4">
      <h1 className="font-bold text-lg">Book Library</h1>
      <Link href={"/books"}>Book</Link>
      <Link href={"/categories"}>Category</Link>
      <div className="ms-auto flex gap-4">
        {accessToken ? (
          <button
            className="px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200 active:scale-95"
            onClick={() => logout()}
          >
            Logout
          </button>
        ) : (
          <Link href={"/login"}>
            <button className="px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200 active:scale-95">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
