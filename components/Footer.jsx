import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  LocateIcon,
  LocateOffIcon,
  Mail,
  Map,
  Menu,
  Phone,
  Send,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-no-repeat bg-cover  bg-footer_shape  px-4 sm:px-6 lg:px-12 padding-x rounded-tl-[35px] rounded-tr-[35px] relative">
      <div className=" max-container  grid grid-cols-2 md:grid-cols-4 py-24 ">
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-2xl font-semibold text-black">Menu</h1>
          <p className="text-neutral-500 text-sm">Home</p>
          <p className="text-neutral-500 text-sm">Why choose</p>
          <p className="text-neutral-500 text-sm">Special Manu</p>
          <p className="text-neutral-500 text-sm">Regular Menu</p>
          <p className="text-neutral-500 text-sm">Special Cheif</p>
        </div>
        <div className="flex flex-col items-start justify-start gap-3 w-full">
          <h1 className="text-2xl text-black font-semibold w-full md:text-start text-center  ">
            Help
          </h1>
          <p className="text-neutral-500 text-sm w-full md:text-start text-center ">
            Privacy
          </p>
          <p className="text-neutral-500 text-sm w-full md:text-start text-center ">
            Terms & Conditions
          </p>
          <p className="text-neutral-500 text-sm w-full md:text-start text-center ">
            Special Manu
          </p>
          <p className="text-neutral-500 text-sm w-full md:text-start text-center ">
            Policy
          </p>
        </div>
        <div className="flex flex-col items-start justify-start gap-3">
          <h1 className="text-2xl text-black font-semibold">Contact</h1>
          <p className="text-neutral-500 text-sm flex items-center gap-2">
            <Phone size={15}></Phone> +92 3074142350
          </p>
          <p className="text-neutral-500 text-sm flex items-center gap-2">
            <Mail size={15} />
            toptaste4142@gmail.com
          </p>
          <p className="text-neutral-500 text-sm flex items-center gap-2">
            <Menu size={15}></Menu> Special Manu
          </p>
          <p className="text-neutral-500 text-sm flex items-center gap-2">
            <LocateIcon size={15} /> Food Street Near Khalil Bakery
          </p>
        </div>
        <div className="flex flex-col items-start justify-start gap-3 w-full">
          <div className="text-2xl text-black font-semibold  w-full items-center flex gap-2 justify-center ">
            <Image
              src="/assets/images/logo.svg"
              width={70}
              height={50}
              alt="logo"
            ></Image>
          </div>
          <div className="w-full items-center border px-1 py-1  rounded-3xl flex">
            <input
              type="text"
              style={{ padding: "0 0 0 15px", height: "40px", marginBottom: 0 }}
              className="bg-transparent w-full pl-5 pr-3  border-none  h-0 outline-none text-sm"
              placeholder="Enter Your Email"
            ></input>
            <button className="bg-primary rounded-3xl px-2 py-2">
              <Send size={20} className="animate-pulse hover:text-white"></Send>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="flex justify-center items-center text-softtext">
          <p>
            © Top-Taste is Proudly own by{" "}
            <span className="text-primary font-semibold">Shahzaib</span>{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
