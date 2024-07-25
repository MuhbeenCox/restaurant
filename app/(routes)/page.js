import React from "react";
import { Bike, Lock, Salad } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Deals from "@components/Deals";
import Image from "next/image";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { getData } from "@app/services";
import Heading_section from "@components/Heading_section";
import PopularFood from "@components/PopularFood";
import Categories from "@components/Categories";
import Hero from "@components/Hero";

// Custom Next Arrow

const getFoodItem = async () => {
  const res = await getData('foodItem')
  return res.data;
};

const HomePage = async () => {
  const foodItems = await getFoodItem();
  return (
    <>
      <Hero />
<Categories heading={true}></Categories>
      <Deals foodItems={foodItems}></Deals>

      <PopularFood popularFood={foodItems}></PopularFood>

      <section className="w-full  relative  max-container  md:px-10 lg:px-20 flex-wrap overflow-hidden ">
        <div className="flex flex-col md:flex-row  items-center md:items-start py-24 flex-wrap  ">
          <div className="flex-1  w-full relative max-w-xs md:max-w-md lg:max-w-md 2xl:max-w-lg h-auto aspect-square    ">
            <div className="w-full h-full shadow-lg bg-primary rounded-full p-6">
              <div className="border border-dashed border-black w-full h-full rounded-full">
                <div className="flex flex-col gap-3 w-full h-full justify-center items-center">
                  <Image
                    src="/assets/images/logo.svg"
                    width={100}
                    height={100}
                    alt="logo"
                  />
                  <h1 className="font-bold text-4xl text-black">Top Tast</h1>
                </div>
              </div>
            </div>

            <Image
              src="/assets/images/restant2.png"
              width={210}
              height={210}
              alt="restant2"
              className="absolute animate_left_right md:-top-16 md:right-1/4 -top-9 right-1/3 max-md:w-28 max-md:h-28"
            />
            <Image
              src="/assets/pizza/pizza-1.png"
              width={210}
              height={210}
              alt="restant2"
              className="absolute  animate_left_right top-1/4 md:mt-6 md:-left-24 -left-8  max-md:w-28 max-md:h-28"
            />
            <Image
              src="/assets/images/restant4.png"
              width={210}
              height={210}
              alt="restant2"
              className="absolute  animate_left_right top-1/4 mt-6 md:-right-24 -right-8 max-md:w-28 max-md:h-28"
            />
            <Image
              src="/assets/images/restant5.png"
              width={210}
              height={210}
              alt="restant2"
              className="absolute  animate_left_right md:-bottom-24 md:right-1/4 -bottom-14 right-1/3 max-md:w-28 max-md:h-28"
            />
          </div>
          <div className="flex-1  text-start flex flex-col gap-y-4 mt-16 px-6 md:pl-9 md:max-w-xl w-full mx-auto md:mt-0  ">
            <h1 className="text-black text-2xl md:text-3xl xl:text-4xl font-semibold  ">
              Restant is One Of The Most Hygienic & Trusted Food Service
            </h1>
            <p className="text-softtext">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>

            <p>
              Restaurants range from inexpensive and informal lunching or dining
              places catering to people working nearby.
            </p>
            <Button className="md:mt-6 max-w-32 mx-auto md:mx-0 text-lg bg-green-400 hover:bg-green-500">
              Know More
            </Button>
          </div>
        </div>
        <div
          className="absolute md:flex hidden
         md:bottom-0 right-0 "
        >
          <Image
            src="/assets/images/service-shape2.png"
            width={200}
            height={200}
            alt="service_shape"
            className="object-contain max-md:max-w-32 max-md:h-32 "
          ></Image>
        </div>
      </section>

      <section className="w-full flex md:flex-row flex-col md:gap-y-0 gap-y-14  padding">
        <div className="flex-1">
          <div className="flex flex-col gap-y-4">
            <label className="text-primary">Download</label>
            <h1 className="text-black text-2xl md:text-3xl xl:text-4xl font-semibold  ">
              Download Our Mobile App That Make You More Easy to Order
            </h1>
            <p className="text-softtext leading-6 md:pr-3">
              Restaurants range from inexpensive and informal lunching or dining
              places catering to people working nearby, with modest food served
              in simple settings at low prices.
            </p>
          </div>
          <div>
            <div className="mt-7">
              <ul>
                <li className="flex mb-3 items-center md:text-xl text-lg  gap-x-6 border border-transparent shadow-md hover:border-primary max-w-sm py-3 px-4 rounded-lg hover:translate-x-4 transition-all duration-500">
                  <span className="w-11 h-11 rounded-full flex justify-center items-center bg-primary font-bold text-lg ">
                    01
                  </span>{" "}
                  Select your Food
                </li>
                <li className="flex mb-3 items-center md:text-xl text-lg  gap-x-6 border border-transparent shadow-md hover:border-primary max-w-sm py-3 px-4 rounded-lg hover:translate-x-4 transition-all duration-500">
                  <span className="w-11 h-11 rounded-full flex justify-center items-center bg-primary font-bold text-lg ">
                    02
                  </span>{" "}
                  Add to Cart
                </li>{" "}
                <li className="flex mb-3 items-center md:text-xl text-lg  gap-x-6 border border-transparent shadow-md hover:border-primary max-w-sm py-3 px-4 rounded-lg hover:translate-x-4 transition-all duration-500">
                  <span className="w-11 h-11 rounded-full flex justify-center items-center bg-primary font-bold text-lg ">
                    03
                  </span>{" "}
                  Oder your Food
                </li>
              </ul>
            </div>
            <div className="mt-11 flex gap-3">
              <Link href="/">
                <Image
                  src="/assets/images/google-store.png"
                  width={170}
                  height={150}
                  alt="google-store"
                  className="object-contain hover:scale-105 transition-all"
                ></Image>
              </Link>
              <Link href="/">
                <Image
                  src="/assets/images/app-store.png"
                  width={170}
                  height={150}
                  alt="google-store"
                  className="object-contain hover:scale-105 transition-all"
                ></Image>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center  mt-9 ">
          <div className="h-[80%]  relative">
            <Image
              src="/assets/images/download1.png"
              width={300}
              height={400}
              className="object-contain max-h-[550px] "
              alt="download"
            />
          </div>
        </div>
      </section>

      <section className="border w-full flex md:flex-row flex-col md:gap-y-0 gap-y-11 items-center justify-between bg-[#000000] py-12 relative padding-x">
        <div className="  w-[30%] h-full top-0 left-0  bg-no-repeat bg-cover absolute bg-reservation_shape "></div>
        <div className="max-w-lg z-10 ">
          <h1 className="text-white mb-4 text-2xl md:text-3xl font-bold text-center md:text-start ">
            Subscribe News letter for get update
          </h1>
          <p className="text-white text-center md:text-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <form>
            <div className="bg-gray-100 py-0 mt-4 md:mt-6 rounded-full items-center flex pl-4 px-1.5 ">
              <input
                type="text"
                className=" rounded-full h-full  px-4 mt-2 border-none outline-none"
                placeholder="Shahzaib@gmail.com"
              />
              <button
                type="submit"
                className="px-6 rounded-full border text-white font-semibold py-3 bg-red-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div>
          <Image
            src="/assets/images/subscribe-main.png"
            width={400}
            height={300}
            alt="subscribe-main"
          ></Image>
        </div>
      </section>

      <section className=" w-full flex flex-col items-center padding-x padding-b min-h-screen  pt-8 my-4 padding-t">
        {/* <h2 className="text-center text-3xl text-black  font-semibold">
          WHY CHOOSE US ?
        </h2>

        <p className="w-full md:max-w-[560px] text-center text-neutral-500 text-base">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p> */}
        <Heading_section heading="WHY CHOOSE US" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-6 mt-14 h-52">
          <Card className="flex relative flex-col group transition-all duration-500 hover:bg-primary gap-3 border-none justify-center items-center w-full hover:shadow-lg rounded-md py-12 p-4">
            <div className=" group-hover:opacity-100 opacity-0 w-full h-full  bg-no-repeat bg-cover absolute bg-service_shape "></div>
            <span className="w-11 h-11 bg-orange-200 flex justify-center items-center  rounded-full">
              {" "}
              <Salad className="text-primary w-8 h-8"></Salad>
            </span>
            <CardTitle className="text-neutral-600 transition-all group-hover:text-white text-lg md:text-xl 2xl:text-2xl ">
              Fresh & Healthy Food
            </CardTitle>
            <CardDescription className="text-center transition-all group-hover:text-white">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </CardDescription>
          </Card>
          <Card className="flex relative flex-col  bg-primary gap-3  border-none justify-center items-center w-full shadow-lg rounded-lg  p-4">
            <div className="w-full h-full  bg-no-repeat bg-cover absolute bg-service_shape "></div>
            <span className="w-11 h-11 bg-sky-200 flex justify-center items-center  rounded-full">
              {" "}
              <Lock className="text-sky-500 w-8 h-8"></Lock>
            </span>
            <CardTitle className="text-white text-lg md:text-xl 2xl:text-2xl">
              Save & Secure Payment
            </CardTitle>
            <CardDescription className="text-center text-white">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </CardDescription>
          </Card>
          <Card className="flex flex-col relative group transition-all duration-500 hover:bg-primary gap-3 border-none justify-center items-center w-full hover:shadow-lg rounded-md py-12 p-4">
            <div className=" group-hover:opacity-100 opacity-0 w-full h-full  bg-no-repeat bg-cover absolute bg-service_shape "></div>
            <span className="w-11 h-11 bg-red-200 flex justify-center items-center  rounded-full">
              {" "}
              <Bike className="text-red-500 w-8 h-8"></Bike>
            </span>
            <CardTitle className="text-neutral-600 transition-all group-hover:text-white text-lg md:text-xl 2xl:text-2xl ">
              Free & Fast Home Delivery
            </CardTitle>
            <CardDescription className="text-center transition-all group-hover:text-white">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </CardDescription>
          </Card>
        </div>
      </section>
    </>
  );
};

export default HomePage;
