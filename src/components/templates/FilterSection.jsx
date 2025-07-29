"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterSection = ({
  title,
  items = [],
  children,
  onToggle,
  selectedItems = [],
  customItems = [], 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const combinedItems = [...items, ...customItems];

  return (
    <div className="w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer hover:opacity-70 transition border-b border-white pb-3 w-[95%]"
      >
        <span className="text-md">{title}</span>
        {isOpen ? (
          <FaChevronUp className="text-sm" />
        ) : (
          <FaChevronDown className="text-sm" />
        )}
      </div>

      {isOpen && (
        <ul className="pl-4 pr-2 mt-2 flex flex-col gap-3 text-sm text-gray-200">
          {combinedItems.map((item, index) => {
            // تعیین کلید و برچسب (label)
            const key =
              typeof item === "string"
                ? item
                : item.id || item.slug || `${title}-${index}`;

            const label =
              typeof item === "string"
                ? item
                : item.label || item.name || item.slug || "نامشخص"; 

            return (
              <li
                key={key}
                className="flex items-center gap-2 cursor-pointer hover:text-white transition"
                onClick={() => onToggle?.(key)}
              >
                <input
                  type="checkbox"
                  checked={selectedItems?.includes(key)}
                  readOnly
                  className="cursor-pointer"
                />
                <span
                  className={
                    selectedItems?.includes(key) ? "font-bold text-white" : ""
                  }
                >
                  {label}
                </span>
              </li>
            );
          })}

          {children}
        </ul>
      )}
    </div>
  );
};

export default FilterSection;
