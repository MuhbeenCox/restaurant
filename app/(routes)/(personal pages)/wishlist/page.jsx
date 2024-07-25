"use client";
import { WishListContext } from "@app/contextProvider/WishListContext";
import Box from "@components/Box";
import EmptySection from "@components/EmptySection";
import Heading_section from "@components/Heading_section";
import ProductCard from "@components/ProductCard";
import { useContext } from "react";

const WishListPage = () => {
  const { wishlist } = useContext(WishListContext);

  return (
    <Box>
      <div className="pt-11">
        <Heading_section heading="Wishlist"></Heading_section>
      </div>

      {wishlist?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-11 padding-b">
          {wishlist?.map((foodItem) => {
            return (
              <>
                {console.log(foodItem, "check food wishlist items details")}
                <ProductCard
                  key={foodItem._id}
                  products={foodItem}
                ></ProductCard>
              </>
            );
          })}
        </div>
      ) : (
        <>
          <EmptySection label="Empty Wishlist" />
        </>
      )}
    </Box>
  );
};

export default WishListPage;
