"use client";
import React from "react";
import Sidebar from "../templates/Sidebar";
import Topbar from "../templates/Topbar";
import { useFilter } from "@/context/FilterContext";
import useDebounce from "@/hooks/useFilteredProducts"; 

const Layout = ({ children }) => {
  const { searchTerm, setSearchTerm } = useFilter();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);



  return (
    <div>
      <section className="flex">
        <Sidebar />
        <div className="w-[100%]">
          <Topbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {React.cloneElement(children, { searchTerm: debouncedSearchTerm })}
        </div>
      </section>
    </div>
  );
};

export default Layout;
