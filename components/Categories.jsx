"use client";
import React, { useEffect, useState } from "react";
import Heading_section from "./Heading_section";
import { getData } from "@app/services";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePathname, useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

const Categories = ({ heading }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const params = useSearchParams();

  const url = usePathname();
  const getCategories = async () => {
    try {
      setLoading(true);
      const res = await getData("category");
      setCategories(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSelectedCategory(params.get("category") || "All");
  }, [params]);

  return (
    <section className="px-2 pr-16 pl-8  ">
      {heading && <Heading_section heading="Categories"></Heading_section>}
      <div className="mt-11">
        <Carousel className="w-full py-6 ">
          <CarouselContent className="md:-ml-1">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="md:ms-1 basis-1/3 md:basis-1/6 lg:basis-1/7"
                >
                  <div className="border rounded-md px-6 py-4 flex flex-col gap-y-2 items-center min-w-32">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <>
                <CarouselItem className="md:ms-1 mb-5 basis-1/3 md:basis-1/6 lg:basis-1/7">
                  <Link
                    href="/menu"
                    onClick={() => setSelectedCategory("All")}
                    className={`${
                      selectedCategory === "All" &&
                      "border-primary bg-yellow-100 shadow-md"
                    } border rounded-md px-6 py-4 flex flex-col gap-y-2 items-center  hover:bg-yellow-100 hover:border-primary cursor-pointer group`}
                  >
                    <div className="min-h-12 flex justify-center items-center">
                      <Image
                        src="/assets/images/All_food.png"
                        className="object-contain group-hover:scale-105"
                        width={50}
                        height={50}
                        alt="All"
                      />
                    </div>
                    <h2 className="font-medium text-base capitalize">All</h2>
                  </Link>
                </CarouselItem>
                {categories?.map((category) => (
                  <CarouselItem
                    key={category._id}
                    className="md:ms-1 basis-1/3 md:basis-1/6 lg:basis-1/7"
                  >
                    <Link
                      href={`/menu?category=${category.slug}`}
                      className={`${
                        selectedCategory === category.name &&
                        "border-primary bg-yellow-100 shadow-md"
                      } border rounded-md px-6 py-4 flex flex-col gap-y-2 items-center  hover:bg-yellow-100 hover:border-primary cursor-pointer group`}
                    >
                      <div className="min-h-12 max-h-12 flex justify-center items-center">
                        {" "}
                        <Image
                          src={category?.image}
                          className="object-contain group-hover:scale-105"
                          width={50}
                          height={50}
                          alt={category.name}
                        />
                      </div>

                      <h2 className="font-medium text-base capitalize">
                        {category?.name}
                      </h2>
                    </Link>
                  </CarouselItem>
                ))}
              </>
            )}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
