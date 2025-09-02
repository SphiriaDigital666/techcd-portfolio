import React from "react";

import { Category } from "@/lib/types";
import { Checkbox } from "@/components/user/ui/Checkbox";

type ProductFilterSidebarProps = {
  categories: Category[];
  selectedCategories: Category[];
  handleCategoryChange: (cat: Category) => void;
};

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  categories,
  selectedCategories,
  handleCategoryChange,
}) => {
  return (
    <div className="bg-foreground/5 border-foreground/20 h-fit rounded-[1em] border p-[1em] text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-1 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
      <h2 className="mb-[1em] font-semibold uppercase">Categories</h2>

      <div className="space-y-[0.8em]">
        {categories.map((cat) => (
          <div key={cat.name}>
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => handleCategoryChange(cat)}
                aria-label={`Filter by ${cat}`}
                tabIndex={0}
              />
              <span>{cat.name}</span>
            </label>
          </div>
        ))}
      </div>

      <div className="via-foreground mt-[1.2em] h-[1px] w-full bg-gradient-to-r from-transparent to-transparent"></div>
    </div>
  );
};

export default ProductFilterSidebar;
