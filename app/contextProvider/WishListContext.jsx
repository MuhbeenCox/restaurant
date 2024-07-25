'use client'
import { addData, deleteData, getData } from "@app/services";
import { createContext, useEffect, useState } from "react";
import { ReviewProvider } from "./ReviewContext";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const getWishList = async () => {
        const res = await getData("wishlist");
        setWishlist(res?.foodItems);
    }

    useEffect(() => {
        getWishList();
    }, [])


    const addToWishlist = async (productId) => {
        try {
            const res = await addData("wishlist", { productId });
            console.log(res, "check post req 1122")
            setWishlist((prevWishlist) => {
                if (!Array.isArray(prevWishlist)) {
                    prevWishlist = []
                }

                const newItem = res?.wishList.foodItems.find((item) => item._id === productId);
                return newItem ? [...prevWishlist, newItem] : prevWishlist
            })
        } catch (error) {
            console.log(error)
        }
    }


    const removeFromWishlist = async (productId) => {
        try {

            const res = await deleteData("wishlist", { productId });

            console.log(res), "check removed 1122"
            if (res.success) {
                setWishlist((prevWishlist) => {
                    return prevWishlist.filter((item) => item._id !== productId);
                })


            }


        } catch (error) {
            console.log(error)
        }

    }





    return (
        <WishListContext.Provider value={{ addToWishlist, wishlist, removeFromWishlist }}>

            <ReviewProvider>
                {children}
            </ReviewProvider>
        </WishListContext.Provider>
    );
}

