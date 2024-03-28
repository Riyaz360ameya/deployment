import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import { resetUser } from "@/app/redux/users/userSlice";
import { resetProject } from "@/app/redux/users/userProSlice";
import { resetLeadProject } from "@/app/redux/teamLead/leadProSlice";
import { resetDevTasks } from "@/app/redux/developer/developerProSlice";
const DropdownUser = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user.userDetails);
  const design = user.designation

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const onLogout = async () => {
    try {
      const { data } = await axios.get("/api/users/logout")
      dispatch(resetUser())
      dispatch(resetProject())
      dispatch(resetLeadProject())
      dispatch(resetDevTasks())
      toast.success(data.message)
      design === 'user' ? router.push("/user/login") : design === 'Project Manager' ? router.push("/projectManager/login")
        : design === 'Exterior' || design === 'Interior' ? router.push("/teamLead/login") : router.push("/developer/login")
    } catch (error) {
      console.log(error.message, '------------Header Error')
    }
  }
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
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user.firstName} {user.lastName}
          </span>
          <span className="block text-xs">
            {user.designation === 'user' ? '' :
              user.designation === 'Exterior' || user.designation === 'Interior' ? user.designation + " Lead" : user.designation}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={"/pmImage.png"}
            style={{
              width: "auto",
              height: "auto",
              borderRadius: '100px'
            }}
            alt="User"
          />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* Dropdown Start */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-5 py-2 flex w-62.5 z-1 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark text-sm">
          <li >
            <Link
              href="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562ZM11 11.3031C14.6406 11.3031 20.4844 12.9406 20.4844 16.5594V19.1656H1.51562V16.5594C1.51562 12.9406 7.35938 11.3031 11 11.3031Z"
                  fill=""
                />
              </svg>
              <p className="text-sm">Profile</p>
            </Link>
          </li>
          <li>
            <Link
              href="/account-settings"
              className="flex items-center gap-3.5 text-sm mb-3 font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.1875 10.9375C14.4531 10.9375 13.0625 12.3281 13.0625 14.0625V16.4062H10.3125C8.57812 16.4062 7.1875 17.7969 7.1875 19.5312V20.4688C7.1875 21.1719 7.79688 21.7812 8.5 21.7812H15.875C16.5781 21.7812 17.1875 21.1719 17.1875 20.4688V19.5312C17.1875 17.7969 15.7969 16.4062 14.0625 16.4062H11.3125V14.0625C11.3125 12.3281 12.7031 10.9375 14.4375 10.9375H16.1875ZM11 0.703125C11 0.314062 11.3141 0 11.7031 0H14.2969C14.6859 0 15 0.314062 15 0.703125V1.4375C15 1.82793 14.6859 2.14062 14.2969 2.14062H13.5938C12.8795 2.14062 12.2969 2.72319 12.2969 3.4375C12.2969 4.15181 12.8795 4.73438 13.5938 4.73438H14.2969C14.6859 4.73438 15 5.04707 15 5.4375V6.17188C15 6.56231 14.6859 6.875 14.2969 6.875H13.5938C12.8795 6.875 12.2969 7.45757 12.2969 8.17188C12.2969 8.88618 12.8795 9.46875 13.5938 9.46875H14.2969C14.6859 9.46875 15 9.78143 15 10.1719V10.9062C15 11.2956 14.6859 11.6094 14.2969 11.6094H13.5938C12.8795 11.6094 12.2969 12.192 12.2969 12.9062C12.2969 13.6205 12.8795 14.2031 13.5938 14.2031H14.0625C14.7031 14.2031 15.1719 14.6719 15.1719 15.3125V18.0781C15.1719 18.653 14.7827 19.0938 14.3125 19.0938H7.6875C7.21729 19.0938 6.82812 18.653 6.82812 18.0781V15.3125C6.82812 14.6719 7.29688 14.2031 7.9375 14.2031H8.40625C9.12056 14.2031 9.70312 13.6205 9.70312 12.9062C9.70312 12.192 9.12056 11.6094 8.40625 11.6094H7.9375C7.54844 11.6094 7.23438 11.2956 7.23438 10.9062V10.1719C7.23438 9.78143 6.92031 9.46875 6.53125 9.46875H5.82812C5.43869 9.46875 5.125 9.15507 5.125 8.76562V8.17188C5.125 7.78244 5.43869 7.46875 5.82812 7.46875H6.53125C7.24556 7.46875 7.82812 6.88618 7.82812 6.17188C7.82812 5.45757 7.24556 4.875 6.53125 4.875H5.82812C5.43869 4.875 5.125 4.56231 5.125 4.17188V3.4375C5.125 2.74731 5.68125 2.1875 6.375 2.14062H6.53125C6.92031 2.14062 7.23438 1.82793 7.23438 1.4375V0.703125C7.23438 0.314062 7.54844 0 7.9375 0H11.7031C12.0922 0 12.4062 0.314062 12.4062 0.703125C12.4062 0.314062 12.7203 0 13.1094 0H16.8906C17.2797 0 17.5938 0.314062 17.5938 0.703125V3.4375C17.5938 4.12769 17.0375 4.6875 16.3438 4.73438H16.1875C15.7984 4.73438 15.4844 5.04707 15.4844 5.4375V6.17188C15.4844 6.56231 15.7984 6.875 16.1875 6.875H16.8906C17.6009 6.875 18.1719 7.45757 18.1719 8.17188C18.1719 8.88618 17.6009 9.46875 16.8906 9.46875H16.1875C15.547 9.46875 15.0781 9.9375 15.0781 10.5781V15.3125C15.0781 15.9529 15.547 16.4219 16.1875 16.4219H16.625C16.9531 16.4219 17.1875 16.6562 17.1875 16.9844V17.4219C17.1875 17.75 17.4219 17.9844 17.75 17.9844H19.0625C19.3906 17.9844 19.625 17.75 19.625 17.4219V16.9844C19.625 14.8828 17.9766 13.2344 15.875 13.2344C15.8438 13.2344 15.8125 13.2344 15.7812 13.2344C15.5312 13.2344 15.3125 13.0156 15.3125 12.7656C15.3125 12.5156 15.5312 12.2969 15.7812 12.2969C16.1562 12.2969 16.3594 11.8906 16.0781 11.6094C15.4688 11 14.7656 10.9375 14.4375 10.9375H11Z"
                  fill=""
                />
              </svg>
              <p className="text-sm">Settings</p>
            </Link>

          </li>
        </ul>
        <div className="">
          <button className="flex items-center gap-3.5 px-6 py-2 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base" onClick={onLogout}>
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                fill=""
              />
              <path
                d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                fill=""
              />
            </svg>

            Logout
          </button>
        </div>
      </div>
      {/* Dropdown End */}
    </div>
  );
};

export default DropdownUser;
