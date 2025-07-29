"use server";
import React from "react";
import Layout from "@/components/layouts/ShoppingLayout";
import AllProducts from "@/components/templates/AllProducts";
import Footer from "@/components/modules/Footer";

const Page = () => {
  return (
    <>
      <Layout>
        <AllProducts />
      </Layout>
      <Footer />
    </>
  );
};

export default Page;
