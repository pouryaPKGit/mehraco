import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/Axios";
import { useFilter } from "@/context/FilterContext";
import { useMemo, useEffect } from "react";

const fetchProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data.products;
};

export default function useFilteredProducts() {
  const {
    searchTerm,
    inStockOnly,
    price,
    selectedBrands,
    selectedCategories,
    setAvailableBrands,
  } = useFilter();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const filteredProducts = useMemo(() => {
    const filtered = data.filter((product) => {
      const title = product.title || "";
      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStock = inStockOnly ? product.stock > 0 : true;
      const matchesPrice = price === 0 || product.price <= price;
      const matchesBrand =
        selectedBrands.length > 0
          ? selectedBrands.includes(product.brand)
          : true;

      const matchesCategory = (() => {
        if (
          selectedCategories.includes("ارزان‌ترین") ||
          selectedCategories.includes("گران‌ترین") ||
          selectedCategories.includes("محبوب‌ترین")
        ) {
          return true; 
        } else if (selectedCategories.length > 0) {
          return selectedCategories.includes(product.category);
        }
        return true;
      })();

      return (
        matchesSearch &&
        matchesStock &&
        matchesPrice &&
        matchesBrand &&
        matchesCategory
      );
    });

    let sortedProducts = [...filtered];

    if (selectedCategories.includes("ارزان‌ترین")) {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (selectedCategories.includes("گران‌ترین")) {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (selectedCategories.includes("محبوب‌ترین")) {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    } else if (price > 0) {
      
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    return sortedProducts;
  }, [
    data,
    searchTerm,
    inStockOnly,
    price,
    selectedBrands,
    selectedCategories,
  ]);

  useEffect(() => {
    const uniqueBrands = [
      ...new Set(
        data
          .map((p) => p.brand?.trim())
          .filter((b) => b && b !== "")
      ),
    ];

    setAvailableBrands((prev) => {
      const isSame =
        prev.length === uniqueBrands.length &&
        prev.every((b) => uniqueBrands.includes(b));
      if (isSame) return prev;
      return uniqueBrands;
    });
  }, [data, setAvailableBrands]);

  return { filteredProducts, isLoading, error };
}
