import Layout from "@/components/Layout";
import React, {
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import useAuthStore from "@/stores/auth";
import { LayoutContext, ILayoutContext } from "@/contexts/LayoutContext";
import axiosInstance from "@/libs/axios";
import CreateBook from "@/components/CreateBook";
import Description from "@/components/Description";
import swal from "@/libs/sweetalert";

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
}

const books = () => {
  const [name, setName] = useState("");
  const [books, setBooks] = useState<IBook[]>([]);
  const { setLoading } = useContext(LayoutContext);
  const { accessToken } = useAuthStore();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getBooks();
  };

  const getBooks = async () => {
    let { data } = await axiosInstance.get("/books", {
      params: {
        name,
      },
    });
    setBooks(data.data);
    console.log(data.data);
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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto w-full md:w-2/3 p-4">
        <div className="bg-white border shadow-lg p-4">
          <div className="p-2 grid grid-cols-1 lg:grid-cols-2">
            <div className="mb-4 w-full lg:w-auto">
              <CreateBook refresh={getBooks} />
            </div>
            <div className="lg:ms-auto lg:w-full">
              <form onSubmit={handleSearch} className="flex gap-2 justify-end">
                <input
                  className="px-4 py-2 rounded-none border w-full lg:w-auto"
                  type="text"
                  value={name}
                  placeholder="Search category..."
                  onChange={(e) => setName(e.target.value)}
                />
                <button className="px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200">
                  Cari
                </button>
              </form>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {books.map((b, i) => (
              <div key={i} className="flex flex-col bg-white border">
                <div className="w-full z-0 aspect-square object-cover overflow-hidden relative border-b">
                  <img src={b.image_url} />
                </div>
                <div className="p-2 w-ful">
                  <h1 className="text-xl font-semibold">{b.title}</h1>
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
                  <a
                    href={b.image_url}
                    target="_blank"
                    className="px-2 py-1 text-sm text-white bg-gray-800 hover:bg-black duration-200"
                  >
                    Open
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault(), handleDeleteBook(b.id);
                    }}
                    className="px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 duration-200"
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

export default books;
