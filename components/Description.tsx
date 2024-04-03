import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <div className="has-tooltip w-full">
      <span className="hidden md:block tooltip text-sm shadow-lg p-1 bg-black text-white">
        {description}
      </span>
      <div className="w-full md:truncate">
        <span className="text-sm">{description}</span>
      </div>
    </div>
  );
}
