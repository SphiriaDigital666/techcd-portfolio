"use client";

import { useState } from "react";
import { DataTable } from "./DataTable";
import { createColumns } from "./columns";
import { FaSearch } from "react-icons/fa";
import AddButton from './AddButton';
import AddCategory from './AddCategory';
import ViewCategory from './VeiwCategory';
import EditCategory from './EditCategory';

// Define Category type to match columns
type Category = {
    id: string;
    categoryName: string;
    description: string;
};

const AllProductsTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showViewCategory, setShowViewCategory] = useState(false);
    const [showEditCategory, setShowEditCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Mock category data
    const [categories, setCategories] = useState<Category[]>([
        {
            id: "1",
            categoryName: "Electronics",
            description: "All electronic devices including smartphones, laptops, tablets, and accessories",
        },
        {
            id: "2",
            categoryName: "Clothing",
            description: "Fashion items including shirts, pants, dresses, and footwear for all ages",
        },
        {
            id: "3",
            categoryName: "Home & Garden",
            description: "Furniture, decor, kitchen appliances, and outdoor living essentials",
        },
        {
            id: "4",
            categoryName: "Sports & Fitness",
            description: "Sports equipment, workout gear, and fitness accessories for active lifestyle",
        },
        {
            id: "5",
            categoryName: "Books & Media",
            description: "Books, magazines, movies, music, and educational materials",
        },
        {
            id: "6",
            categoryName: "Beauty & Health",
            description: "Cosmetics, skincare, personal care, and health supplements",
        },
        {
            id: "7",
            categoryName: "Automotive",
            description: "Car parts, accessories, maintenance tools, and vehicle care products",
        },
        {
            id: "8",
            categoryName: "Toys & Games",
            description: "Children's toys, board games, puzzles, and entertainment items",
        },
    ]);

    // Enhanced filtering logic
    const filteredCategories = categories.filter((category) => {
        // Category name search
        const nameMatches =
            searchTerm === "" ||
            (category.categoryName &&
                category.categoryName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));

        // Description search
        const descriptionMatches =
            searchTerm === "" ||
            (category.description &&
                category.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));

        return nameMatches || descriptionMatches;
    });

    // Handle adding new category
    const handleCategoryAdded = (newCategory: any) => {
        // Convert the API response format to match our Category type
        const categoryToAdd: Category = {
            id: newCategory.id,
            categoryName: newCategory.category,
            description: newCategory.description,
        };
        setCategories(prev => [...prev, categoryToAdd]);
    };

    // Handle viewing category
    const handleViewCategory = (category: Category) => {
        setSelectedCategory(category);
        setShowViewCategory(true);
    };

    // Handle editing category
    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
        setShowEditCategory(true);
    };

    // Handle updating category
    const handleCategoryUpdated = (updatedCategory: Category) => {
        setCategories(prev => 
            prev.map(cat => 
                cat.id === updatedCategory.id ? updatedCategory : cat
            )
        );
    };

    // Create columns with handlers
    const columns = createColumns({
        onViewCategory: handleViewCategory,
        onEditCategory: handleEditCategory,
    });

    return (
        <div>
            <div className="container mx-auto">
                {/* Category Table with Sorting & Search */}
                <div className="mt-6 rounded-2xl   sm:gap-0">
                    <div className="grid flex-wrap gap-4 sm:mb-6 sm:items-center sm:justify-between sm:gap-2 md:flex">
                        <div>
                            <div className="flex items-center gap-4">
                                <h1 className="text-[28px] font-bold sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] text-[#E5E5E5]">
                                    Products
                                </h1>
                                <span className="text-[17px] text-[#E5E5E5] font-semibold sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[20px] mt-2">
                                    Category
                                </span>
                            </div>
                        </div>

                        <div className=" grid gap-4 sm:flex flex-wrap mr-[130px]">
                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search For..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-[220px] rounded-3xl bg-[#0B1739]  px-3 pl-10 py-3 md:w-[250px] lg:w-[280px] xl:w-[285px] 2xl:w-[285px] border-[#FFFFFF33]/20 text-[14px]"
                                />
                                <FaSearch className="absolute top-1/2 left-3 xl:-translate-y-1 -translate-y-1/2 transform text-[#AEB9E1] text-[14px]" />
                            </div>
                            <div className="mt-2">
                                <AddButton 
                                    identifier="addButton" 
                                    buttonText="Add Category" 
                                    onClick={() => setShowAddCategory(true)}
                                />
                            </div>

                            {/* Status Filter */}
                            {/* <div className="relative mt-[7px] mr-[50px] rounded-2xl bg-[#F9FBFF]">
                                <label className="text-[12px]">Status:</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="items-center bg-[#F9FBFF] px-3 py-1 text-[12px]"
                                >
                                    <option value="all">All</option>
                                    <option
                                        value="Pending"
                                        className="font-poppins text-[#0F5FC2]"
                                    >
                                        Pending
                                    </option>
                                    <option
                                        value="Accepted"
                                        className="font-poppins text-[#00AC4F]"
                                    >
                                        Accepted
                                    </option>
                                    <option
                                        value="Declined"
                                        className="font-poppins text-[#D0004B]"
                                    >
                                        Declined
                                    </option>
                                </select>
                            </div> */}

                            {/* Class Filter */}
                            {/* <div className="relative mt-[7px] mr-[50px] rounded-2xl bg-[#F9FBFF]">
                                <label className="text-[12px]">Class:</label>
                                <select
                                    value={classFilter}
                                    onChange={(e) => setClassFilter(e.target.value)}
                                    className="font-poppins items-center bg-[#F9FBFF] px-2 py-1 text-[12px]"
                                >
                                    <option value="all" className="font-poppins">
                                        All Classes
                                    </option>
                                    <option value="18_24_MONTHS">Month(18-24)</option>
                                    <option value="TODDLER">Toddler(2-3)</option>
                                    <option value="PRE_K1">Pre K1(3-4)</option>
                                    <option value="SECOND_YEAR">2nd Year(4-5)</option>
                                    <option value="THIRD_YEAR">Kindergarten(5-6)</option>
                                </select>
                            </div> */}
                        </div>
                    </div>

                    <div className="mt-[10px] sm:mt-0">
                        <DataTable columns={columns} data={filteredCategories} />
                    </div>
                </div>
            </div>

            {/* Add Category Popup */}
            {showAddCategory && (
                <AddCategory
                    onClose={() => setShowAddCategory(false)}
                    onCategoryAdded={handleCategoryAdded}
                />
            )}

            {/* View Category Popup */}
            {showViewCategory && selectedCategory && (
                <ViewCategory
                    onClose={() => setShowViewCategory(false)}
                    category={selectedCategory}
                />
            )}

            {/* Edit Category Popup */}
            {showEditCategory && selectedCategory && (
                <EditCategory
                    onClose={() => setShowEditCategory(false)}
                    category={selectedCategory}
                    onCategoryUpdated={handleCategoryUpdated}
                />
            )}
        </div>
    );
};

export default AllProductsTable;
