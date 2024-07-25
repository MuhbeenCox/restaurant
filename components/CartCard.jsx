import React, { useContext } from 'react'
import Quantity from './Quantity'
import { CartContext, cartProductPrice } from '@app/contextProvider/Provider';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CartCard = ({item,checkOut,Itemindex}) => {
console.log(Itemindex,"check index 1221");
    const {  setCartProducts, removeToCart } =
    useContext(CartContext);

    const handleQuantityChanged = (index, newQuantity) => {


        setCartProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((product, idx) => {
            if (idx === index) {
              return { ...product, quantity: newQuantity };
            }
            return product;
          });
          saveCartProductsToLocalStorage(updatedProducts);
          return updatedProducts;
        });
      };
      const saveCartProductsToLocalStorage = (cartProducts) => {
        localStorage.setItem("cart", JSON.stringify(cartProducts));
      };
    
  return (
    <div
    className="border-b md:pt-4 flex items-center gap-x-2 md:justify-between mt-6  pb-4 rounded-md mb-2 h-32 md:max-h-28"
  >
    <div className={`flex items-center ${checkOut? "md:min-w-60   w-45":"md:min-w-80   w-60" }  gap-x-2   `}>
      <Link href={`/menu/${item._id}`} className="w-20 h-20 relative">
      
        <Image
          src={item?.image}
          layout="fill"
          className="absolute object-contain"

          alt={item.name}
        ></Image>
      </Link>
      <div className="">
        <h3 className="font-semibold capitalize px-2 mb-1">
          {item.name}
        </h3>{" "}
        <div className="flex items-center gap-x-1 py-1 ">
          <label className="bg-sky-50 capitalize text-sky-500 max-md:text-sm rounded-sm md:px-2 px-1 md:py-1">
            {item?.category}
          </label>
          {
            item?.sizes && <label className="bg-green-50 capitalize text-green-500 rounded-sm max-md:text-sm md:px-2 px-1 md:py-1">
            {item?.sizes?.name}
          </label>
          }
          
        </div>
        {item?.extraIngredientPrices.length > 0 && (
          <div className="md:mt-1  flex md:flex-row flex-col  md:items-center md:mb-4">
            <div className="text-sm text-softtext ms-1 "> Extras:</div>
            <div className=" flex gap-x-1 md:gap-x-0">
              {item?.extraIngredientPrices.map((etxra, index) => (
                <label
                  key={index}
                  className="bg-red-50 text-red-500 rounded-sm md:ms-1 max-md:text-sm md:px-2 px-1 md:py-1 mb-1"
                >
                  {" "}
                  {etxra.name}
                </label>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
    <div className="flex md:flex-row flex-col  w-full md:gap-x-16 md:justify-center gap-y-3 md:gap-y-0 items-center">
     {
        checkOut ? (
            <h2>Qty: <span className='font-semibold'>{item.quantity}</span> </h2>
        ):  <div>
        <Quantity
          quantity={item.quantity}
          setQuantity={(newQuantity) =>
            handleQuantityChanged(Itemindex, newQuantity)
          }
        />
      </div>
     }

    
      <div className="">
        Rs:  {cartProductPrice(item)}
      </div>
    </div>

    <div className=" font-semibold  h-full flex items-center">
      <button type="button" onClick={() => removeToCart(Itemindex)}>
        {" "}
        <Trash2 color="red" size={20}></Trash2>
      </button>
    </div>
  </div>
  )
}

export default CartCard