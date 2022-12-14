import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import Icon from "./icon/";

type Props = {
  position: {
    [key: string]: number;
  } | null;
  onClose: () => void;
};

export const Actions = ({ position, onClose }: Props) => {
  return (
    <div
      className="absolute top-0 left-0"
      // ref={ref}
      style={
        position
          ? { transform: `translate(${position.x}px, ${position.y}px)` }
          : {}
      }
    >
      <Menu>
        <Transition
          as={Fragment}
          show={true}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-indigo-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <Icon
                        name="edit-active"
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    ) : (
                      <Icon
                        name="edit-inactive"
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    // onClick={() => {
                    //   setClose(true);
                    // }}
                    className={`${
                      active ? "bg-indigo-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <Icon
                        name="delete-active"
                        className="w-5 h-5 mr-2 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <Icon
                        name="delete-inactive"
                        className="w-5 h-5 mr-2 text-violet-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete2
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
