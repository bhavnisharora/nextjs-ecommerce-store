"use client";

import PayPalButton from "@/components/Helper/PayPalButton";
import { Button } from "@/components/ui/button";
import { addItem, CartItem, clearCart, removeItem } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  // get our cart items
  const items = useSelector((state: RootState) => state?.cart?.items);

  // calculating total quantity
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  //   calculate the total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleAddItem = (item: CartItem) => {
    dispatch(addItem(item));
  };

  const removeCartHandler = (id: number) => {
    dispatch(removeItem({ id }));
  };

  // Get authenticated user

  const { user } = useUser();

  // handle payment success

  const handleSuccess = (details: any) => {
    router.push("/success");
    dispatch(clearCart());
  };

  return (
    <div className="mt-8 min-h-[60vh]">
      {items.length == 0 && (
        <div
          className="flex items-center
          w-full h-[80vh] flex-col justify-center"
        >
          <Image
            src="/images/cart.svg"
            alt="empty_cart"
            width={400}
            height={400}
            className="object-cover mx-auto"
          />
          <h1 className="mt-8 text-2xl font-semibold">Your Cart is Empty</h1>
          <Link href="/">
            <Button className="mt-4">Shop Now</Button>
          </Link>
        </div>
      )}

      {/* if cart is not empty */}
      {items.length > 0 && (
        <div className="md:w-4/5 w-[95%] mx-auto grid grid-cols-1 xl:grid-cols-6 gap-12">
          {/* cart items */}
          <div className="rounded-lg shadow-md overflow-hidden xl:col-span-4">
            <h1 className="p-4 text-xl sm:text-2xl md:text-3xl font-bold text-white bg-blue-700">
              Your Cart ({totalQuantity} Items )
            </h1>
            {items.map((item) => {
              return (
                <div key={item.id} className="p-5">
                  <div
                    className="flex pb-6 mt-2 border-b-[1.5px] border-opacity-25 border-gray-700
                     items-center space-x-10"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={180}
                      height={180}
                    />
                  </div>
                  <div>
                    <h1 className="md:text-xl mt-2 text-base font-bold text-black">
                      {item.title}
                    </h1>
                    <h1 className="md:text-lg text-sm font-semibold">
                      Category : {item.category}
                    </h1>
                    <h1 className="md:text-2xl text-lg font-bold text-blue-900">
                      ${item.price}
                    </h1>
                    <h1 className="md:text-lg text-sm font-semibold">
                      Quantity: {item.quantity}
                    </h1>
                    <div className="flex items-center mt-4 space-x-2">
                      <Button
                        onClick={() => handleAddItem(item)}
                        className="cursor-pointer"
                      >
                        Add More
                      </Button>
                      <Button
                        onClick={() => removeCartHandler(item.id)}
                        variant={"destructive"}
                        className="cursor-pointer"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* cart summary */}
          <div className="xl:col-span-2">
            <div className="bg-indigo-900 sticky top-[25vh] p-6 rounded-lg">
              <h1 className="text-center mb-8 mt-8 text-white text-2xl font-semibold">
                Summary
              </h1>
              <div className="w-full h-[1.2px] bg-white bg-opacity-20"> </div>
              <div className="flex mt-4 mb-10 text-xl uppercase font-semibold text-white items-center justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex mb-6 text-xl uppercase font-semibold text-white items-center justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              {!user && (
                <Link href="/sign-in">
                  <Button className="bg-orange-500 w-full cursor-pointer">
                    Sign In to checkout
                  </Button>
                </Link>
              )}
              {user && (
                <PayPalButton amount={totalPrice.toFixed(2)} onSuccess={handleSuccess} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
