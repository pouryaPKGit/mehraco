import React, { useState } from "react";
import Image from "next/image";

export default function ProductCard({ product, onMoreInfo }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="lg:w-[300px] md:w-[250px] w-[300px] min-h-[400px] rounded-lg shadow hover:shadow-lg transition bg-amber-100">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={200}
        height={200}
        style={{ objectFit: "cover", borderRadius: "0.5rem" }}
        onLoad={() => setImageLoaded(true)}
        className={`mx-auto transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="flex flex-col items-start pr-5 gap-y-3 text-black mt-3">
        <h2 className="text-md font-semibold mb-2">{product.title}</h2>
        <p className="text-sm">
          قیمت محصول: <span className="bg-white p-1">{product.price} $</span>
        </p>
        <p className="text-sm">
          برند:{" "}
          <span className="bg-white p-1">
            {product.brand?.trim() || "نامشخص"}
          </span>
        </p>
        <p className="text-sm">
          تعداد موجودی: <span className="bg-white p-1">{product.stock}</span>
        </p>
      </div>
      <button
        onClick={onMoreInfo}
        className="text-sm bg-amber-950 text-white lg:p-2 md:p-1 p-2 rounded-md lg:mt-3 mt-3 md:mt-6 lg:mr-[190px] md:mr-[150px] mr-[190px] cursor-pointer hover:scale-105 duration-500"
      >
        اطلاعات بیشتر
      </button>
    </div>
  );
}
