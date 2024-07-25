"use client";

import Breadcrumb from "@components/Breadcrumb";
import Categories from "@components/Categories";
import EmptySection from "@components/EmptySection";
import Heading_section from "@components/Heading_section";
import ProductCard from "@components/ProductCard";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MenuPage = () => {
  const params = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async (category) => {
    setLoading(true);
    try {
      const { data } = category
        ? await axios.get(
            `http://localhost:3000/api/foodItem/get?category=${category}`
          )
        : await axios.get(`http://localhost:3000/api/foodItem/get`);

      setData(data.data);
    } catch (error) {
      console.log("get req error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const category = params.get("category" || "");

    getData(category);
  }, [params]);

  return (
    <div className="bg-white py-12">
      <Heading_section heading="Menu"></Heading_section>
      <Categories></Categories>
      {loading ? (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-3 padding-x padding-b mt-9">
          {[1, 2, 3, 4].map((_, index) => (
            <Card className=" h-auto " key={index}>
              <CardHeader className=" max-md:p-0">
                <div className="flex  justify-center items-center w-full h-24 md:h-36  md:max-h-36">
                  <Skeleton className="h-20 w-20 rounded-full"></Skeleton>
                </div>
              </CardHeader>
              <CardContent
                className=" px-4
        "
              >
                <Skeleton className="font-semibold text-sm mt-2 md:text-lg   w-full text-center"></Skeleton>
                <Skeleton className=" w-full  md:min-h-16"></Skeleton>
              </CardContent>
              <CardFooter className="  flex mt-9 justify-between  gap-x-2">
                <Skeleton className="w-20 h-7 "></Skeleton>
                <Skeleton className="w-20 h-7 "></Skeleton>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : data?.length > 0 ? (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-3 padding-x padding-b mt-9 ">
          {data.map((item) => (
            <ProductCard products={item} key={item._id}></ProductCard>
          ))}
        </div>
      ) : (
        <div className="padding-b ">
          <EmptySection label={"Empty Food"}></EmptySection>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
