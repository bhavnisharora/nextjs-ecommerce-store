"use client";

import { Button } from "@/components/ui/button";
import { addItem } from "@/store/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "@/typing";
import { toast } from "sonner";

const AddToCart = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    toast.success("Added Item to the Cart");
    dispatch(addItem(product));
  };
  return (
    <div>
      <Button
        onClick={() => {
          addToCartHandler();
        }}
        className="mt-6"
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default AddToCart;
