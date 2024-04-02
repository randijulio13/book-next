import useAuthStore from "@/stores/auth";
import Link from "next/link";
import React, { ReactNode, useEffect } from "react";

const Navbar = () => {
  const { accessToken, setAccessToken } = useAuthStore();
  

  useEffect(() => {}, []);

  const logout = () => {
    setAccessToken("");
  };
  return (
    <nav className="h-20 bg-white shadow w-full flex items-center px-4 gap-4">
      <h1 className="font-bold text-lg">Book Library</h1>
      <Link href={"/books"}>Book</Link>
      <Link href={"/categories"}>Category</Link>
      <div className="ms-auto flex gap-4">
        {accessToken ? (
          <button onClick={() => logout()}>Logout</button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
