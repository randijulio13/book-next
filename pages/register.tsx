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

type RegisterInput = {
  username: string;
  name: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const { setLoading } = useContext(LayoutContext);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = async (input) => {
    try {
      setLoading(true);
      let { data } = await axios.post("/auth/register", input);
      swal.fire({
        icon: "success",
        title: "Success",
        text: "Register success",
      });
      router.push("/login");
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
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="px-4 py-2 border"
              {...register("name", { required: "name is required" })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
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
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="confirm_password">Confirm Password</label>
            <div className="w-full relative">
              <input
                {...register("confirm_password", {
                  required: "password is required",
                  validate: {
                    confirm: (val: string) => {
                      if (watch("password") != val) {
                        return "your passwords do no match";
                      }
                    },
                  },
                })}
                type={showConfirm ? "text" : "password"}
                id="confirm_password"
                className="px-4 py-2 border w-full"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((old) => !old)}
                className="absolute inset-y-0 end-5 hover:text-black text-gray-400 duration-200 active:-rotate-180"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirm_password && (
              <span className="text-red-500">{errors.confirm_password.message}</span>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Link href={"/login"}>
              <button
                type="button"
                className="px-4 py-2 text-white bg-gray-400 hover:bg-gray-500 duration-200"
              >
                Login
              </button>
            </Link>
            <button className="px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200">
              Register
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
