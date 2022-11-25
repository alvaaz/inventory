import { Menu } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { forwardRef } from "react";

type Props = {
  onClick: any;
  ref: any;
};

export const MenuComponent = forwardRef(function MenuComponent({
  onClick,
  ref,
}: any) {
  return (
    <div
      className="w-8 h-6 border border-green-300"
      onClick={onClick}
      ref={ref}
    >
      <DotsHorizontalIcon
        className="w-5 h-5 text-violet-200 hover:text-violet-100"
        aria-hidden="true"
      />
    </div>
  );
});
