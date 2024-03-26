import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PiChatDotsLight } from "react-icons/pi";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative z-50">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${notifying === false ? "hidden" : "inline"
            }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <div className="relative cursor-pointer text-black">
          <div className='w-10 h-10 flex items-center justify-center'>
            <PiChatDotsLight className=" text-gray-400 text-2xl " />
          </div>
          <span className='absolute h-2 w-2 bg-red-500 rounded-full top-0 right-0 flex items-center justify-center'>
            <span className=" h-2 w-2 animate-ping rounded-full bg-red-500 opacity-75"></span>
          </span>
        </div>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        // className={`absolute h-90 w-60 bg-white -right-20 ${dropdownOpen === true ? "block" : "hidden"}`}
        className={`absolute -right-28  mt-2.5 flex h-90 w-72 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >

        <div className="px-4 py-3 ">
          <h5 className="text-sm font-medium text-bodydark2 ">Messages</h5>
        </div>

        <ul className="flex h-80 flex-col overflow-y-auto px-3 py-3">
          <li className="">
            <Link href="#" className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
              <div className="h-12 w-12 rounded-full bg-slate-500 ">
                <Image
                  width={112}
                  height={112}
                  className='rounded-full'
                  src={"/profileImage.jpg"}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
              <div className="h-12 w-12 rounded-full bg-slate-500">
                <Image
                  width={112}
                  height={112}
                  className='rounded-full'
                  src={"/profileImage.jpg"}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
              <div className="h-12 w-12 rounded-full bg-slate-500">
                <Image
                  width={112}
                  height={112}
                  className='rounded-full'
                  src={"/profileImage.jpg"}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
              <div className="h-12 w-12 rounded-full bg-slate-500">
                <Image
                  width={112}
                  height={112}
                  className='rounded-full'
                  src={"/profileImage.jpg"}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      
      </div>
    </li>
  );
};

export default DropdownMessage;
