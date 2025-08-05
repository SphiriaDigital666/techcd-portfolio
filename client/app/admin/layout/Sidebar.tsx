"use client";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusSquare,
  FaUsers,
  FaUserPlus,
  FaUser,
  FaUserShield,
  FaShoppingCart,
  FaTicketAlt,
  FaUserCircle,
  FaBoxes,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";


const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div>
        <button
          className="fixed top-4 left-1 z-50 p-2 text-2xl rounded-md xl:hidden  text-black"
          onClick={() => setIsOpen(!isOpen)} // Toggle Sidebar
        >
          {isOpen ? <AiOutlineClose size={24} className="text-white md:ml-[250px] ml-[200px]" /> : <GiHamburgerMenu size={24} />}
        </button>

        {/* Sidebar (Mobile Overlay) */}
        {isOpen && (
          <div
            className="fixed inset-0  bg-opacity-50 z-40 xl:hidden"
            onClick={() => setIsOpen(false)} // Close sidebar when clicking outside
          ></div>
        )}
      </div>

      {/* Sidebar */}
      <div className="2xl:px-5 xl:px-3 xl:py-3 ">
        <div
          className={`fixed left-0 z-40 rounded-2xl top-0 min-h-screen w-[270px] md:w-[300px] container mx-auto 2xl:w-[300px] xl:w-[300px] bg-black/30 backdrop-blur-[500px] xl:px-3 text-[#9197B3]  transition-transform 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    xl:translate-x-0 2xl:translate-x-0 xl:relative xl:block`}
        >
          <div className="flex py-5 px-18">
            <h1 className=" xl:text-[32px] text-[14px] sm:text[16px] md:text-[20px] font-bold text-[#FFFFFF] ">
              TECHCD

            </h1>
          </div>
          <nav className="py-7 px-4">
            <ul className="space-y-3">
              <li
                className={`flex items-center space-x-4 px-6 py-2 rounded-xl ${isActive("/admin") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                  }`}
              >
                <FaTachometerAlt className="h-[20px] w-[20px]" />
                <Link href="/admin" className="text-[16px] text-[#E5E5E5] font-semibold">Dashboard</Link>
              </li>

              {/* <li
                className={`flex items-center space-x-4 px-6 py-2 rounded-3xl ${isActive("/admin/Student") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                  }`}
              >
                <FaUserGraduate className="xl:text-[14px] text-[12px]" />
                <Link href="/admin/Student">Students</Link>
              </li> */}

              {/* Blog Dropdown */}
              <li className="relative">
                <button
                  className={`flex items-center justify-between w-full px-6 py-2 rounded-3xl ${isActive("/admin/Product") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                    }`}
                  onClick={() => setIsBlogOpen(!isBlogOpen)}
                >
                  <div className="flex items-center space-x-4">
                    <FaBoxOpen className="h-[20px] w-[20px]" />
                    <span className="text-[16px] text-[#E5E5E5] font-semibold"> Product</span>
                  </div>
                  {isBlogOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>

                {isBlogOpen && (
                  <ul className="ml-8 mt-2 space-y-2  ">
                    <li
                      className={`flex items-center space-x-3 ml-[-16px] pl-[50px] pr-8 py-2 rounded-xl ${isActive("/admin/Product/All-product")
                          ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white"
                          : ""
                        }`}
                    >
                      <FaBoxes className="h-[20px] w-[20px]" />
                      <Link href="/admin/Product/All-product" className="text-[16px] text-[#E5E5E5] font-semibold">
                        All Products
                      </Link>
                    </li>

                    <li
                      className={`flex items-center space-x-3 ml-[-16px] pl-[50px] pr-8 py-2   rounded-xl ${isActive("/admin/Product/add-product") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white " : ""
                        }`}
                    >
                      <FaPlusSquare className="h-[20px] w-[20px]" />
                      <Link href="/admin/Product/add-product" className="text-[16px] text-[#E5E5E5] font-semibold">Create Product</Link>
                    </li>
                    <li
                      className={`flex items-center space-x-3 ml-[-16px] pl-[50px] pr-8 py-2 rounded-xl ${isActive("/admin/blog/add-blog") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                        }`}
                    >
                      <MdCategory className="h-[20px] w-[20px]" />
                      <Link href="/admin/Product/Category" className="text-[16px] text-[#E5E5E5] font-semibold">Category</Link>
                    </li>
                    {/* <li className={`flex items-center space-x-3 px-6 py-2 rounded-3xl ${isActive("/admin/blog/blog-categories") ? "bg-[#2CAB6D] text-white" : ""}`}>
                      <FaTags className="text-[14px]" />
                      <Link href="/admin/blog/blog-categories">Categories</Link>
                    </li>
                    <li className={`flex items-center space-x-3 px-6 py-2 rounded-3xl ${isActive("/admin/blog/blog-tags") ? "bg-[#2CAB6D] text-white" : ""}`}>
                      <FaTags className="text-[14px]" />
                      <Link href="/admin/blog/blog-tags">Tag</Link>
                    </li> */}
                  </ul>
                )}
              </li>

              {/* Event Dropdown */}
              <li className="relative">
                <button
                  className={`flex items-center justify-between w-full px-6 py-2 rounded-xl ${isActive("/admin/Event") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                    }`}
                  onClick={() => setIsEventOpen(!isEventOpen)}
                >
                  <div className="flex items-center space-x-4">
                    <FaUsers className="h-[20px] w-[20px]" />
                    <span className="text-[16px] text-[#E5E5E5] font-semibold">Customers</span>
                  </div>
                  {isEventOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>

                {isEventOpen && (
                  <ul className="ml-8 mt-2 space-y-2 ">
                    <li
                      className={`flex items-center space-x-3 ml-[-16px] pl-[50px] pr-8 py-2 rounded-xl  ${isActive("/admin/event/all-event") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white " : ""
                        }`}
                    >
                      <FaUsers className="h-[20px] w-[20px]" />
                      <Link href="/admin/event/all-event" className="text-[16px] text-[#E5E5E5] font-semibold">All Customers</Link>
                    </li>
                    <li
                      className={`flex items-center space-x-3 ml-[-16px] pl-[50px] pr-8 py-2    rounded-3xl ${isActive("/admin/event/add-event") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                        }`}
                    >
                      <FaUserPlus className="h-[20px] w-[20px]" />
                      <Link href="/admin/event/add-event" className="text-[16px] text-[#E5E5E5] font-semibold">Add Customers</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="relative">
                <button
                  className={`flex items-center justify-between w-full px-6 py-2 rounded-xl ${isActive("") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""}`}
                  onClick={() => setIsGalleryOpen(!isGalleryOpen)} // Toggle Gallery Dropdown
                >
                  <div className="flex items-center space-x-4">
                    <FaUser className="h-[20px] w-[20px]" />
                    <span className="text-[16px] text-[#E5E5E5] font-semibold">Users</span>
                  </div>
                  {isGalleryOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </button>

                {isGalleryOpen && (
                  <ul className="ml-8 mt-2 space-y-2 ">
                    <li
                      className={`flex items-center space-x-3 ml-[-16px] pl-[50px] pr-8 py-2 rounded-xl ${isActive("/admin/gallery") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""}`}
                    >
                      <FaUsers className="h-[20px] w-[20px]" />
                      <Link href="/admin/gallery" className="text-[16px] text-[#E5E5E5] font-semibold">All Users</Link>
                    </li>
                    <li
                      className={`flex items-center space-x-3 ml-[-16px] pl-[50px] pr-8 py-2 rounded-xl ${isActive("/admin/gallery/gallery-category") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""}`}
                    >
                      <FaUserPlus className="h-[20px] w-[20px]" />
                      <Link href="/admin/gallery/gallery-category" className="text-[16px] text-[#E5E5E5] font-semibold"> Add Users</Link>
                    </li>
                    <li
                      className={`flex items-center space-x-3 ml-[-16px] pl-[50px] pr-8 py-2   rounded-xl ${isActive("/admin/gallery/gallery-category") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""}`}
                    >
                      <FaUserShield className="h-[20px] w-[20px]" />
                      <Link href="/admin/gallery/gallery-category" className="text-[16px] text-[#E5E5E5] font-semibold"> User role </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                className={`flex items-center space-x-4 px-6 py-2 rounded-xl ${isActive("/admin/Profile") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                  }`}
              >
                <FaShoppingCart className="h-[20px] w-[20px]" />
                <Link href="/admin/Profile" className="text-[16px] text-[#E5E5E5] font-semibold">Orders</Link>
              </li>
              <li
                className={`flex items-center space-x-4 px-6 py-2 rounded-xl ${isActive("/admin/Profile") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                  }`}
              >
                <FaTicketAlt className="h-[20px] w-[20px]" />
                <Link href="/admin/Profile" className="text-[16px] text-[#E5E5E5] font-semibold">Coupons</Link>
              </li>
              <li
                className={`flex items-center space-x-4 px-6 py-2 rounded-xl ${isActive("/admin/Profile") ? "bg-gradient-to-r from-[#43A8F7] to-[#028EFC] text-white" : ""
                  }`}
              >
                <FaUserCircle className="h-[20px] w-[20px]" />
                <Link href="/admin/Profile" className="text-[16px] text-[#E5E5E5] font-semibold">Profile</Link>
              </li>
              {/* <li>
                
                <button
                  
                  className="flex items-center space-x-4 px-6 py-2 rounded-3xl w-full text-left hover:bg-red-600 hover:text-white transition-colors"
                >
                  <FiLogOut className="xl:text-[14px] text-[12px]" />
                  <span>Log out</span>
                </button>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;