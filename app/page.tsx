import React from "react";
import AllProduct from "@/components/Home/AllProduct";
import Category from "@/components/Home/Category";
import Hero from "@/components/Home/Hero";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Category />
      <AllProduct />
    </div>
  );
};

export default HomePage;
