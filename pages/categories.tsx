import CreateCategory from "@/components/CreateCategory";
import Layout from "@/components/Layout";
import axiosInstance from "@/libs/axios";
import swal from "@/libs/sweetalert";
import useAuthStore from "@/stores/auth";
import classNames from "classnames";
import React, { useEffect, useState } from "react";

const categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const { accessToken, checkAuthState } = useAuthStore();

  const getCategories = async () => {
    let { data } = await axiosInstance.get("/categories", {
      params: {
        name,
      },
    });
    setCategories(data.data);
  };

  const deleteCategories = async (id: string) => {
    try {
      if (!checkAuthState()) return;
      let { isConfirmed } = await swal.fire({
        title: "Delete?",
        icon: "question",
        text: "Are you sure you want to delete this category?",
        showCancelButton: true,
        confirmButtonText: "Delete",
      });

      if (!isConfirmed) return;

      let { data } = await axiosInstance.delete(`/categories/${id}`, {
        headers: {
          accessToken,
        },
      });

      swal.fire({
        title: "Success",
        icon: "success",
        text: "Category deleted",
        confirmButtonText: "Close",
      });
      getCategories();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCategories();
  };

  return (
    <Layout>
      <div className="mx-auto w-full md:w-2/3 p-4">
        <div className="bg-white border shadow-lg p-4">
          <div className="p-2 flex">
            <div className="mb-4">
              <CreateCategory refresh={getCategories} />
            </div>
            <div className="ms-auto">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  className="px-4 py-2 rounded-none border"
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
          <table className="w-full">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th className="text-start">Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length == 0 && (
                <tr className="h-24">
                  <td colSpan={3} className="text-center">
                    No data
                  </td>
                </tr>
              )}
              {categories.map((c: any, i) => (
                <tr key={c.id} className="h-12">
                  <td className="text-center">{i + 1}</td>
                  <td>{c?.name}</td>
                  <td className="text-center">
                    <div>
                      <button
                        disabled={!accessToken}
                        onClick={() => deleteCategories(c.id)}
                        className={classNames(
                          "px-2 py-1 text-sm duration-200 text-white",
                          {
                            "bg-gray-300 hover:cursor-not-allowed":
                              !accessToken,
                            "bg-gray-800 hover:bg-black": accessToken,
                          }
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default categories;
