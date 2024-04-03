import { LayoutContext } from "@/contexts/LayoutContext";
import axiosInstance from "@/libs/axios";
import swal from "@/libs/sweetalert";
import useAuthStore from "@/stores/auth";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import { ICategory } from "@/pages/categories";

interface CreateBookInput {
  title: string;
  description: string;
  release_year: string;
  price: string;
  total_pages: string;
  category_id: string;
  image: FileList;
}

interface CreateBookProps {
  refresh: () => void;
  categories: ICategory[];
}

export default function CreateBook({ refresh, categories }: CreateBookProps) {
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
  } = useForm<CreateBookInput>();

  const onSubmit: SubmitHandler<CreateBookInput> = async (input) => {
    try {
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("release_year", input.release_year);
      formData.append("price", input.price);
      formData.append("total_pages", input.total_pages);
      formData.append("category_id", input.category_id);
      formData.append("image", input.image[0]);

      setLoading(true);
      let { data } = await axiosInstance.post("/books", formData, {
        headers: {
          accessToken,
        },
      });

      swal.fire({
        title: "Success",
        icon: "success",
        text: "Book created",
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
        Create Book
      </button>

      <Modal title="Create Book" isOpen={isOpen} closeModal={closeModal}>
        <div className="mt-2">
          <form
            id="book"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="px-4 py-2 border"
                id="title"
                {...register("title", {
                  required: "title is required",
                })}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="border px-4 py-2"
                {...register("description", {
                  required: "description is required",
                })}
                id="description"
                cols={30}
                rows={3}
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="release_year">Release Year</label>
              <input
                type="number"
                className="px-4 py-2 border"
                id="release_year"
                {...register("release_year", {
                  required: "release year is required",
                })}
              />
              {errors.release_year && (
                <span className="text-red-500 text-sm">
                  {errors.release_year.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="px-4 py-2 border"
                id="price"
                {...register("price", {
                  required: "price is required",
                })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="total_pages">Total Pages</label>
              <input
                type="number"
                className="px-4 py-2 border"
                id="total_pages"
                {...register("total_pages", {
                  required: "total pages is required",
                })}
              />
              {errors.total_pages && (
                <span className="text-red-500 text-sm">
                  {errors.total_pages.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category_id">Category</label>
              <select
                defaultValue={""}
                className="px-4 py-2 border"
                id="category_id"
                {...register("category_id", {
                  required: "category is required",
                })}
              >
                <option disabled value="">
                  -- select category --
                </option>
                {categories.map((c, i) => (
                  <option key={i} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <span className="text-red-500 text-sm">
                  {errors.category_id.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                className="px-4 py-2 border"
                id="image"
                {...register("image", {
                  required: "image is required",
                })}
              />
              {errors.image && (
                <span className="text-red-500 text-sm">
                  {errors.image.message}
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
            form="book"
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
