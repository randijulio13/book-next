import CreateCategory from "@/components/CreateCategory";
import Layout from "@/components/Layout";
import axiosInstance from "@/libs/axios";
import useAuthStore from "@/stores/auth";
import React, { useEffect, useState } from "react";

const categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const { accessToken } = useAuthStore();

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
      let { data } = await axiosInstance.delete(`/categories/${id}`, {
        headers: {
          accessToken,
        },
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
            {accessToken && (
              <div className="mb-4">
                <CreateCategory refresh={getCategories} />
              </div>
            )}
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
              {categories.map((c: any, i) => (
                <tr key={c.id} className="h-12">
                  <td className="text-center">{i + 1}</td>
                  <td>{c?.name}</td>
                  <td className="text-center">
                    <div>
                      {accessToken ? (
                        <button
                          onClick={() => deleteCategories(c.id)}
                          className="px-2 py-1 text-sm bg-gray-800 hover:bg-black duration-200 text-white"
                        >
                          Delete
                        </button>
                      ) : (
                        "-"
                      )}
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
