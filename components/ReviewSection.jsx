"use client";
import StarRatings from "react-star-ratings";
import { Button } from "./ui/button";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ReviewContext } from "@app/contextProvider/ReviewContext";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircleChevronDown } from "lucide-react";

const ReviewSection = ({ foodId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [visibleReview, setVisibleReview] = useState(5);
  const { getReviews, addReview, reviews, loading, totalRating } =
    useContext(ReviewContext);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    getReviews(foodId);
  }, [foodId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (session?.status === "unauthenticated") {
      router.push("/sign-in");
    } else {
      const res = addReview(foodId, comment, rating);
    }
  };

  const handleShowMore = () => {
    setVisibleReview((prevReview) => prevReview + 4);
  };

  const formatDateTime = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.toLocaleTimeString()}-${date.toLocaleDateString()}`;
  };

  const generateColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="mt-20">
      <div className="flex items-center mb-3 gap-x-4 ">
        {/* <p className=" font-bold ">Review & Rating ({reviews?.length})</p> <p className="text-softtext  font-semibold"> <StarRatings rating={totalRating}  starRatedColor="orange" numberOfStars={5} name='rating' starDimension="15px" starHoverColor="orange"
                            starSpacing="3px"></StarRatings> ({totalRating&& totalRating})</p>  */}
      </div>
      <div className="flex flex-col  md:grid grid-col-1   md:grid-cols-3 gap-10 ">
        <div className=" ">
          <form
            className="border rounded-md px-3 py-3"
            onSubmit={handleReviewSubmit}
          >
            <h1 className="text-black font-medium ">Add Review & Rating</h1>
            <StarRatings
              rating={rating}
              changeRating={(e) => setRating(e)}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              starDimension="17px"
              starHoverColor="orange"
              starSpacing="3px"
            ></StarRatings>
            <textarea
              placeholder="share your review"
              cols={20}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              name="comment"
              className="mt-1 h-28 resize-none border rounded-md p-2"
            ></textarea>

            <div className="w-full mt-3">
              {" "}
              <Button
                disabled={loading || comment.length === 0}
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 flex gap-x-2"
              >
                Submit {loading && <ClipLoader size={15} color="#ffff" />}{" "}
              </Button>
            </div>
          </form>
        </div>
        <div className="col-span-2">
          {reviews?.length > 0 &&
            [...reviews]
              .reverse()
              .slice(0, visibleReview)
              .map((rev) => {
                const color = generateColor();
                return (
                  <div
                    key={rev._id}
                    className="border flex gap-x-4 px-4 py-2 mb-3 rounded-md"
                  >
                    <div className=" flex items-center justify-center  ">
                      {rev?.user.image ? (
                        <Image
                          src={
                            rev.user.image
                              ? rev.user.image
                              : "/assets/avatarr.jpg"
                          }
                          className="rounded-full object-contain bg-cover bg-no-repeat p-1"
                          width={50}
                          height={50}
                          alt="user"
                        ></Image>
                      ) : (
                        <div
                          className={`w-12 h-12  rounded-full flex justify-center items-center capitalize text-white`}
                          style={{ backgroundColor: color }}
                        >
                          {rev.user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="">{rev.comment}</p>
                      <StarRatings
                        rating={rev.rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name="rating"
                        starDimension="13px"
                        starSpacing="3px"
                      ></StarRatings>
                      <p className="text-softtext text-sm mt-1 flex flex-col">
                        <span className="font-semibold text-black">
                          {rev.user.name}
                        </span>{" "}
                        {formatDateTime(rev?.createdAt)}{" "}
                      </p>
                    </div>
                  </div>
                );
              })}
          {reviews?.length > visibleReview && (
            <div className="flex justify-center w-full mt-11">
              <button
                onClick={handleShowMore}
                className="flex text-softtext text-lg gap-x-1 items-center"
              >
                show <CircleChevronDown size={17} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReviewSection;
