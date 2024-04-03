import Layout from "@/components/Layout";
import { LayoutContext } from "@/contexts/LayoutContext";
import axios from "@/libs/axios";
import swal from "@/libs/sweetalert";
import useAuthStore from "@/stores/auth";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type LoginInput = {
  username: string;
  password: string;
};

const Login = () => {
  const { setLoading } = useContext(LayoutContext);
  const { accessToken } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (accessToken !== "") {
      router.push("/books");
    }
  }, [accessToken, router]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<LoginInput>();

  const { setAccessToken } = useAuthStore();

  const onSubmit: SubmitHandler<LoginInput> = async (input) => {
    try {
      setLoading(true);
      let { data } = await axios.post("/auth/login", input);
      setAccessToken(data.accessToken);
      swal.fire({
        icon: "success",
        title: "Success",
        text: "Login success",
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err?.response?.status == 401) {
          setError("username", { message: err?.response?.data.message });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full p-6 h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-2/3 lg:w-1/3 bg-white shadow-lg p-4"
        >
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="px-4 py-2 border"
              {...register("username", { required: "username is required" })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password">Password</label>
            <div className="w-full relative">
              <input
                {...register("password", { required: "password is required" })}
                type={showPassword ? "text" : "password"}
                id="password"
                className="px-4 py-2 border w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword((old) => !old)}
                className="absolute inset-y-0 end-5 hover:text-black text-gray-400 duration-200 active:-rotate-180"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Link href={"/register"}>
              <button
                type="button"
                className="px-4 py-2 text-white bg-gray-400 hover:bg-gray-500 duration-200"
              >
                Register
              </button>
            </Link>
            <button className="px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200">
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
