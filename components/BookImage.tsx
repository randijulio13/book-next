import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function BookImage({
  url,
  close,
}: {
  url: string;
  close: () => void;
}) {

  return (
    <Transition appear show={url !== ""} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed z-40 inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed h-screen w-screen z-50 inset-0">
            <div className="absolute top-8 end-8">
                <button className="text-white text-4xl font-bold" onClick={close}><IoMdClose /></button>
            </div>
          <div className="flex min-h-full items-center h-full justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <img src={url} className="h-full w-auto" />
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
