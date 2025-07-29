"use client";
import React, { useState, useEffect } from "react";
import useFilteredProducts from "@/hooks/useFilteredProducts";
import { ToastContainer } from "react-toastify";
import Pagination from "@/utils/Pagination";
import ProductModal from "./ProductModal";
import ProductCard from "../modules/ProductCard";

export default function AllProducts() {
  const { filteredProducts, isLoading, error } = useFilteredProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return (
      <div className="flex flex-col text-xl justify-center items-center h-screen animate-pulse">
        <div className="w-12 h-12 border-4 border-amber-700 border-solid rounded-sm animate-spin"></div>
        <p className="mt-5">درحال بارگذاری...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-600">
        خطا در دریافت اطلاعات
      </div>
    );
  if (filteredProducts.length === 0)
    return (
      <div className="text-center mt-10 text-gray-600">
        متأسفانه محصولی یافت نشد.
      </div>
    );

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-4">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-5 justify-items-center">
          {currentItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onMoreInfo={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
