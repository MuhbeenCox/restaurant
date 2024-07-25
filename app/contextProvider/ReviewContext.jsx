'use client'
import { addData, getSingleData } from "@app/services";
// import { addData, getSingleData } from "@app/services";
// import { createContext, useState } from "react";

import { createContext, useEffect, useState } from "react"

// export const ReviewContext=createContext();

// export const ReviewProvider=({children})=>{

// const [reviews,setReviews]=useState([]);
// const [loading,setLoading]=useState(false);


// const getReviews= async(id)=>{
// try {
//     const res= await getSingleData("foodItem", id);
//     setReviews(res?.data?.reviews || []);  
// } catch (error) {
//     console.log(error)
// }


// }
// const addReview=async( foodId, comment, rating)=>{
//     try {
//         setLoading(true);
//         const res= await addData("review",{ foodId, comment, rating});
// if(res.success){
//  setReviews((prevReviews)=>[...prevReviews,res.review])
// }
// setLoading(false);
//     } catch (error) {
//         console.log(error);
//     }


// }


//     return(
//         <ReviewContext.Provider value={{getReviews,addReview,reviews,loading}}>
//             {children}
//         </ReviewContext.Provider>
//     );
// }


export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRating, setTotalRating] = useState(0);
    const calculateRating = () => {
        if (!reviews || reviews.length === 0) {
            return setTotalRating(0);
        }
        let totalRating = 0;
        reviews.forEach(item => {
            totalRating += item.rating;
        });

        const averagerating = (totalRating / reviews.length).toFixed(1);

        setTotalRating(Math.min(averagerating,5));

    }


    const getReviews = async (id) => {
        try {
            const res = await getSingleData("foodItem", id);
            setReviews(res?.data.reviews || []);
        } catch (error) {
            console.log(error);
        }

    }
    const addReview = async (foodId, comment, rating) => {
        try {
            setLoading(true);
            const res = await addData('review', { foodId, comment, rating });
            if (res?.success) {
                setReviews((prevReview) => [...prevReview, res.review]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        calculateRating();
    }, [reviews])
    return (
        <ReviewContext.Provider value={{ getReviews, reviews, addReview, loading, totalRating }}>
            {children}
        </ReviewContext.Provider>
    );

}


