import React, { MouseEvent, useState } from "react";
import Modal from "./Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICategory } from "@/pages/categories";
import axiosInstance from "@/libs/axios";

interface FilterBookInput {
  title: string;
  minYear: string;
  maxYear: string;
  minPage: string;
  maxPage: string;
  sortByTitle: "asc" | "desc";
  categoryId: string;
}

interface FilterBookProps {
  categories: ICategory[];
  setBooks: Function;
}

const FilterBook = ({ categories, setBooks }: FilterBookProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterBookInput>();

  const onSubmit: SubmitHandler<FilterBookInput> = async (input) => {
    getBooks(input);
    closeModal()
  };

  const getBooks = async (params?: FilterBookInput) => {
    let { data } = await axiosInstance.get("/books", {
      params,
    });
    setBooks(data.data);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleClear = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    reset();
    closeModal()
    getBooks();
  };
  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 text-white bg-gray-800 hover:bg-black duration-200"
      >
        Filter
      </button>

      <Modal title="Filter Book" isOpen={isOpen} closeModal={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="categoryId">Category</label>
            <select
              defaultValue={""}
              className="px-4 py-2 border"
              id="categoryId"
              {...register("categoryId")}
            >
              <option value="">All Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="px-4 py-2 rounded-none border"
              type="text"
              placeholder="Search by title..."
              {...register("title")}
            />
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="minPage">Filter Page:</label>
            <div className="grid grid-cols-2">
              <input
                id="minPage"
                placeholder="From"
                type="number"
                className="px-4 py-2 border"
                {...register("minPage")}
              />
              <input
                placeholder="To"
                type="number"
                className="px-4 py-2 border"
                {...register("maxPage")}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="minYear">Filter Year:</label>
            <div className="grid grid-cols-2">
              <input
                id="minYear"
                placeholder="From"
                type="number"
                className="px-4 py-2 border"
                {...register("minYear")}
              />
              <input
                placeholder="To"
                type="number"
                className="px-4 py-2 border"
                {...register("maxYear")}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="ms-auto"></div>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 duration-200"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200"
            >
              Apply
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default FilterBook;
