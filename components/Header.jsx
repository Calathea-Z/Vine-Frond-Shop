import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { simpleLogo } from "@/public/assets";
import { navLinks } from "@/constants";
import { motion } from "framer-motion";
import { useState } from "react";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Store } from "@/utils/Store";

const Header = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const [active, setActive] = useState("");

  const logOutHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    jsCookie.remove("userInfo");
    jsCookie.remove("cartItems");
    router.push("/");
  };

  return (
    <nav className="w-full flex items-center justify-between gap-[10px] md:gap-[20px] bg-primary font-mono py-1 px-1 top-0 z-20">
      {/*------------------- Left Logo */}
      <motion.div
        animate={{ x: 0, rotate: 5 }}
        initial={{ x: -100, rotate: -25 }}
        transition={{ duration: 3 }}
      >
        <Link
          href="/"
          className=" flex items-center max-w-xl mx-auto justify-start"
        >
          <Image
            src={simpleLogo}
            alt="Vine & Frond logo"
            className="content-fill w-[85px] min-w-[90px] h-[90px] sm:w-[140px] sm:min-w-[114px] sm:h-[140px] flex-initial"
          />
        </Link>
      </motion.div>

      {/*------------------- Middle Menu       */}
      <div className="w-full space-x-4 flex items-center justify-center text-slate-600">
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-slate-600"
              } hover-underline-animation  text-[18px] xl:text-[24px] cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <Link href={`/${link.id}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/*------------------- Right Nav       */}
      <div className="flex items-center sm:pr-0 pr-5 sm:px-4 space-x-4 w-full justify-end">
        {userInfo ? (
          <div className='flex flex-1 justify-end items-center w-full z-50 mt-2'>
            <Menu as="div" className="relative inline-block text-left z-50">
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <UserCircleIcon className="w-6 h-6 xl:w-10 xl:h-10 hover:text=[#caafa8] aria-hidden:true hover:text-[#caafa8]" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <Menu.Item>
                  <h1 className='group flex w-full justify-center items-center px-2 py-2 text-sm z-50 bg-gray-200 '> Hi, {userInfo.firstName}{" "}!</h1>
                </Menu.Item>
                <Menu.Item>
                  {({active}) => (
                  <Link href='/profile' className={`${
                      active
                        ? "bg-primary text-white"
                        : "bg-white text-slate-800"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm z-50`}>
                    Profile
                  </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({active}) => (
                  <button className={`${
                      active
                        ? "bg-primary text-white"
                        : "bg-white text-slate-800"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm z-50`} onClick={logOutHandler}>
                    Log Out
                  </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        ) : (
          <Link
            href="/login"
            passHref
            className="w-[2.5rem] hover-underline-animation text-xs"
          >
            Log In
          </Link>
        )}
        <MagnifyingGlassIcon className="w-6 h-6 xl:w-10 xl:h-10 hover:text-[#caafa8]" />
        <Link href="/cart">
          <ShoppingBagIcon className="w-6 h-6 xl:w-10 xl:h-10 hover:text-[#caafa8]" />
        </Link>
      </div>
      <div className="sm:hidden flex flex-1 justify-end items-center w-full z-50">
        <Menu as="div" className="relative inline-block text-left z-50">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Bars3Icon className="w-8 h-8 mt-3 hover:text-[#caafa8] aria-hidden:true" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-[10rem] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            {navLinks.map((link) => (
              <Menu.Item key={link.id} as={Fragment}>
                {({ active }) => (
                  <Link
                    href={`/${link.id}`}
                    className={`${
                      active
                        ? "bg-primary text-white"
                        : "bg-white text-slate-800"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm z-50`}
                  >
                    {link.title}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
};
export default Header;
