"use client"; // This tells Next.js it's a client component
import { FaSearch } from 'react-icons/fa';
import React, { useState } from "react";
import { ArrowUp, ArrowDown, Monitor, Users } from "lucide-react";


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
 
  
  return (
    <div className=" ">
      <div className="md:flex sm:px-0 px-5 container mx-auto md:justify-between xl:mb-6 grid sm:mt-0 md:gap-0 gap-3  xl:space-y-0">
        <div>
          <h1 className="2xl:text-3xl xl:text-[26px] text-xl text-[#E5E5E5]">
            Welcome Back Techcd 👋🏼
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              T
            </span>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Navbar;
