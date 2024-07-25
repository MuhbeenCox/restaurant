import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import HeroImagesSection from "./HeroImagesSection";
import { getData } from "@app/services";

const getHeroData = async () => {
  try {
    const res = await getData("header");
    return res.header[0];
  } catch (error) {
    console.log(error);
  }
};

const Hero = async () => {
  const data = await getHeroData();
  console.log(data);
  return (
    <section className=" px-6 sm:px-8  2xl:mt-14 lg:px-12 flex flex-col md:flex-row max-md:flex-col-reverse ">
      <div className="flex flex-1 flex-col md:py-12 pt-4 md:pt-16  items-start justify-start gap-2 md:gap-4">
        <p className=" cursor-pointer  px-6 py-1 text-neutral-500 border border-gray-300 rounded-full">
          Hungry?
        </p>

        <h2 className="uppercase text-[40px]  md:text-5xl text-start md:text-left font-bold text-black tracking-wider my-2 ">
          {data?.heading.slice(0, 12)}
          <span className="md:block md:pt-4">{data?.heading.slice(12)}</span>
        </h2>

        <p className="text-neutral-500 text-justify md:text-left text-base">
          {data?.description}
        </p>
        <div className="flex gap-3 md:gap-6 mt-5 md:mt-0 items-center justify-center w-full md:w-auto">
          <Link href={"/menu"}>
            <Button className="px-8 md:px-16 rounded-full bg-primary">
              Order Now
            </Button>
          </Link>
          <Link href={"/menu"}>
            <Button
              className="px-6 md:px-16 flex items-center gap-1 md:gap-x-3 rounded-full "
              variant="outline"
            >
              Explore More{" "}
              <span className="text-primary ">
                <MoveRight></MoveRight>
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative flex-1">
        <HeroImagesSection headerImages={data}></HeroImagesSection>
      </div>
    </section>
  );
};

export default Hero;
