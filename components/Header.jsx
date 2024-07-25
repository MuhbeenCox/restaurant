"use client";
import { adminLinks, menu } from "@/app/constants";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { userProfile } from "@app/customHooks/userProfile";
import { CartContext } from "@app/contextProvider/Provider";
import MyAccounts from "./MyAccounts";

const Header = ({ admin = false }) => {
  const [scroll, setScroll] = useState(false);
  const [profile, setProfile] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const url = usePathname();
  const { status, data } = useSession();
  const { cartProducts } = useContext(CartContext);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  const { loading, userData } = userProfile();

  const navLinks = admin ? adminLinks : menu;

  console.log(status, "check status session ");
  useEffect(() => {
    if (userData?.image) {
      setProfile(userData.image);
    } else if (data?.user?.image) {
      setProfile(data.user.image);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, userData]);

  return (
    <header
      className={`${
        scroll ? "bg-white/95   sticky top-0" : " bg-primary md:bg-transparent"
      } w-full  h-16 px-4 sm:px-6 lg:px-12 z-50`}
    >
      <div className="flex justify-between items-center  h-full">
        <Link href="/">
          <Image
            src={"/assets/images/logo.svg"}
            width={50}
            height={50}
            alt="logo"
            className="object-contain"
          ></Image>
        </Link>

        <nav className="flex items-center gap-x-3 md:gap-10  ">
          {navLinks?.map((item, index) => (
            <Link
              className={`${
                scroll
                  ? url === item.href
                    ? "text-primary font-bold"
                    : "text-black font-medium "
                  : url === item.href
                  ? "text-black font-bold"
                  : "text-white font-medium "
              }  2xl:text-xl hidden md:flex capitalize transition-colors`}
              key={index}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}

          {status === "unauthenticated" && (
            <div className="flex gap-x-3">
              <Link href="/sign-in">
                <Button className="bg-blue-400 text-white hover:bg-blue-500 ">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" className="">
                  Sign up
                </Button>
              </Link>{" "}
            </div>
          )}

          {status === "authenticated" && (
            <>
              <Link
                href="/cart"
                className={` ${
                  url.split("/")[1] === "dashboard" && "hidden"
                } relative cursor-pointer px-6 py-1 flex justify-center items-center rounded-lg bg-slate-50/50 `}
              >
                <ShoppingCart />
                {cartProducts?.length > 0 && (
                  <span className="absolute w-5 h-5 flex justify-center items-center top-0 right-0 rounded-full text-white  bg-green-500">
                    {cartProducts?.length}
                  </span>
                )}
              </Link>
              <MyAccounts profile={profile} userData={userData}></MyAccounts>
            </>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen} className="">
            <SheetTrigger
              className={`md:hidden ${scroll ? "text-primary" : "text-white"} `}
            >
              {" "}
              <Menu></Menu>
            </SheetTrigger>
            <SheetContent side="top">
              <SheetHeader className="pb-7">
                <SheetTitle className="flex items-start justify-start  ">
                  <Link href="/" className=" relative -top-3">
                    <Image
                      src={"/assets/images/logo.svg"}
                      width={50}
                      height={50}
                      alt="logo"
                      className="object-contain"
                    ></Image>{" "}
                  </Link>
                </SheetTitle>
                <div className="flex gap-y-3 flex-col ">
                  {navLinks?.map((item, index) => (
                    <Link
                      className={`${
                        url === item.href
                          ? "text-primary font-bold"
                          : "text-black font-medium "
                      }
                             transition-colors capitalize`}
                      key={index}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Header;
