import { LayoutContext } from "@/contexts/LayoutContext";
import axiosInstance from "@/libs/axios";
import swal from "@/libs/sweetalert";
import useAuthStore from "@/stores/auth";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";

interface CreateCategoryInput {
  name: string;
}

interface CreateCategoryProps {
  refresh: () => void;
}

export default function CreateCategory({ refresh }: CreateCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken, checkAuthState } = useAuthStore();
  const { setLoading } = useContext(LayoutContext);

  function closeModal() {
    reset();
    setIsOpen(false);
  }

  function openModal() {
    if (!checkAuthState()) return;
    setIsOpen(true);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryInput>();

  const onSubmit: SubmitHandler<CreateCategoryInput> = async (input) => {
    try {
      setLoading(true);
      let { data } = await axiosInstance.post("/categories", input, {
        headers: {
          accessToken,
        },
      });

      swal.fire({
        title: "Success",
        icon: "success",
        text: "Category created",
        confirmButtonText: "Close",
      });
      refresh();
      closeModal();
      reset();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        disabled={!accessToken}
        onClick={openModal}
        className={classNames(
          "w-full lg:w-auto px-4 py-2 duration-200 text-white",
          {
            "bg-gray-300 hover:cursor-not-allowed": !accessToken,
            "bg-gray-800 hover:bg-black": accessToken,
          }
        )}
      >
        Create Category
      </button>

      <Modal title="Create Category" isOpen={isOpen} closeModal={closeModal}>
        <div className="mt-2">
          <form id="category" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="px-4 py-2 border"
                id="name"
                {...register("name", {
                  required: "name is required",
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white hover:bg-gray-500 duration-200"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            form="category"
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
}
