"use client";
import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import FilterSection from "./FilterSection";
import { useFilter } from "@/context/FilterContext";
import axiosInstance from "@/lib/Axios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500);

  const {
    inStockOnly,
    setInStockOnly,
    price,
    setPrice,
    toggleBrand,
    toggleCategory,
    selectedBrands,
    selectedCategories,
    availableBrands,
  } = useFilter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleInStock = () => setInStockOnly(!inStockOnly);

  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await axiosInstance.get("/products");
        const products = response.data.products;

        const max = Math.max(...products.map((p) => p.price));
        setMaxPrice(max);

        setCategories(["ارزان‌ترین", "گران‌ترین", "محبوب‌ترین"]);
      } catch (error) {
        console.error("خطا در گرفتن اطلاعات فیلتر:", error);
       
      }
    }

    fetchFilters();
  }, []);

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-full"
      >
        {isOpen ? (
          <HiX className="text-2xl text-white border border-white  rounded-full cursor-pointer hover:opacity-70 duration-300" />
        ) : (
          <HiOutlineMenuAlt3 className="text-4xl  text-white cursor-pointer hover:opacity-70 duration-200" />
        )}
      </button>

      <div
        className={`fixed top-0 right-0 xl:h-[1050px] h-[1442px] bg-amber-950 w-[250px] transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40 md:relative md:translate-x-0`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <h1 className="mt-20 md:mt-8 pr-5 text-2xl border-b border-white w-[90%] pb-4 mx-auto text-white">
              فیلتر ها
            </h1>

            <ul className="flex mt-5 gap-y-7 flex-col items-start text-white pr-5 w-full">
              <FilterSection
                title="دسته‌بندی"
                items={categories}
                onToggle={toggleCategory}
                selectedItems={selectedCategories}
              />

              <FilterSection
                title="برند"
                items={availableBrands}
                onToggle={toggleBrand}
                selectedItems={selectedBrands}
              />

              <FilterSection title="موجودی">
                <li className="flex items-center justify-between mx-auto w-[95%] pb-1">
                  <span className="text-white text-sm">فقط کالاهای موجود</span>
                  <div
                    onClick={toggleInStock}
                    className={`w-10 h-6 flex items-center ${
                      inStockOnly
                        ? "justify-start bg-yellow-900"
                        : "justify-end bg-gray-400"
                    } rounded-full p-1 cursor-pointer transition-all duration-300`}
                  >
                    <div className="bg-white w-3 h-3 rounded-full shadow-md transition-transform duration-500" />
                  </div>
                </li>
              </FilterSection>

              <FilterSection title="قیمت">
                <li className="w-full px-2">
                  <label className="block text-white text-sm mb-2">
                    قیمت‌گذاری (حداکثر)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="10"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-0.5 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-yellow-900"
                  />
                  <div className="text-sm text-white mt-4 text-start">
                    تا {price.toLocaleString()} دلار
                  </div>
                </li>
              </FilterSection>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
