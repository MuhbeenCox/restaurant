import { WishListContext } from "@app/contextProvider/WishListContext";
import { HeartCrack, HeartIcon } from "lucide-react";
import { useContext } from "react";

const WishlistButton = ({ foodId }) => {
  const { addToWishlist, wishlist, removeFromWishlist } =
    useContext(WishListContext);

  const handleWishList = () => {
    const existingwishList = wishlist?.some((item) => item._id === foodId);

    if (!existingwishList) {
      addToWishlist(foodId);
    } else {
      removeFromWishlist(foodId);
    }
  };

  return (
    <div>
      <span
        className="absolute top-3 right-2 md:right-5"
        onClick={handleWishList}
      >
        {wishlist?.some((item) => item._id === foodId) ? (
          <HeartCrack strokeWidth={3} size={15} color="#FFBE00"></HeartCrack>
        ) : (
          <HeartIcon size={15} />
        )}
      </span>
    </div>
  );
};
export default WishlistButton;
