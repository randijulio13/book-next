import Layout from "@/components/Layout";
import React, { useContext, useEffect, useState } from "react";
import useAuthStore from "@/stores/auth";
import { LayoutContext, ILayoutContext } from "@/contexts/LayoutContext";
import axiosInstance from "@/libs/axios";
import CreateBook from "@/components/CreateBook";
import Description from "@/components/Description";
import swal from "@/libs/sweetalert";
import classNames from "classnames";
import { ICategory } from "./categories";
import FilterBook from "@/components/FilterBook";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import BookImage from "@/components/BookImage";
import { FaSpinner } from "react-icons/fa";

interface IBook {
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  image_url: string;
  price: string;
  release_year: number;
  thickness: string;
  title: string;
  total_pages: number;
  updated_at: string;
  category: {
    name: string;
  };
}

const Books = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [bookUrl, setBookUrl] = useState("");
  const [loadingBook, setLoadingBook] = useState(true);

  const { setLoading } = useContext(LayoutContext);
  const { accessToken } = useAuthStore();

  const getCategories = async () => {
    let { data } = await axiosInstance.get("/categories", {
      params: {
        name: "",
      },
    });
    console.log(data.data);
    setCategories(data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getBooks = async () => {
    let { data } = await axiosInstance.get("/books", {
      params: {},
    });
    setBooks(data.data);
    setLoadingBook(false)
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleDeleteBook = async (id: string) => {
    const { isConfirmed } = await swal.fire({
      icon: "question",
      title: "Delete?",
      text: "Are you sure you want to delete this book?",
      confirmButtonText: "Delete",
      showCancelButton: true,
    });

    if (!isConfirmed) return;
    try {
      setLoading(true);
      await axiosInstance.delete(`/books/${id}`, {
        headers: {
          accessToken,
        },
      });
      swal.fire({
        icon: "success",
        title: "Success",
        text: "Book deleted",
        confirmButtonText: "Close",
      });
      getBooks();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <BookImage url={bookUrl} close={() => setBookUrl("")} />
      <div className="w-full">
        <div className="p-4">
          <div className="mb-2 flex gap-2">
            <CreateBook categories={categories} refresh={getBooks} />
            <FilterBook categories={categories} setBooks={setBooks} />
          </div>
          {loadingBook && (
            <div className="w-full h-96 flex items-center justify-center">
              <span className="text-4xl">
                <FaSpinner className="animate-spin" />
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {books.map((b, i) => (
              <div key={i} className="flex flex-col bg-white border">
                <div
                  style={{ backgroundImage: `url('${b.image_url}')` }}
                  className={classNames(
                    "w-full z-0 aspect-square object-cover overflow-hidden relative border-b bg-center bg-cover"
                  )}
                ></div>
                <div className="p-2 w-ful">
                  <h1 className="text-xl font-semibold">{b.title}</h1>
                  <span className="text-[0.75rem] font-bold text-gray-400">
                    {b.category.name}
                  </span>
                  <Description description={b.description} />
                  <div className="flex gap-2">
                    <span className="text-[0.75rem] text-gray-400">
                      year: <span className="font-bold">{b.release_year}</span>
                    </span>
                    <span className="text-[0.75rem] text-gray-400">
                      total pages:{" "}
                      <span className="font-bold">{b.total_pages}</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 p-2 border-t">
                  <button
                    type="button"
                    onClick={() => setBookUrl(b.image_url)}
                    // href={b.image_url}
                    // target="_blank"
                    className="px-2 py-1 text-sm text-white bg-gray-800 hover:bg-black duration-200"
                  >
                    Show Image
                  </button>
                  <button
                    disabled={!accessToken}
                    onClick={(e) => {
                      e.preventDefault(), handleDeleteBook(String(b.id));
                    }}
                    className={classNames(
                      "px-2 py-1 text-sm text-white duration-200",
                      {
                        "bg-red-500 hover:bg-red-600": accessToken,
                        "bg-gray-300 cursor-not-allowed": !accessToken,
                      }
                    )}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Books;
