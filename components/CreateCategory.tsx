import axiosInstance from "@/libs/axios";
import useAuthStore from "@/stores/auth";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreateCategoryInput {
  name: string;
}

interface CreateCategoryProps {
  refresh: () => void;
}

export default function CreateCategory({ refresh }: CreateCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken } = useAuthStore();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryInput>();

  const onSubmit: SubmitHandler<CreateCategoryInput> = async (input) => {
    let { data } = await axiosInstance.post("/categories", input, {
      headers: {
        accessToken,
      },
    });

    refresh();
    closeModal();
    reset()
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-gray-800 hover:bg-black duration-200 text-white"
      >
        Create Category
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-none bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Category
                  </Dialog.Title>
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
                        <span className="text-red-500 text-sm">
                          {errors?.name?.message}
                        </span>
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
                      form="#category"
                      type="submit"
                      className="px-4 py-2 bg-gray-800 text-white hover:bg-black duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
