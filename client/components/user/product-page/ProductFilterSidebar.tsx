import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Checkbox } from "@/components/user/ui/Checkbox";

type ProductFilterSidebarProps = {
  categories: Array<{ name: string; subCategories: string[] }>;
  selectedFilters: string[];
  handleFilterChange: (filterKey: string) => void;
};

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  categories,
  selectedFilters,
  handleFilterChange,
}) => {
  const [expanded, setExpanded] = useState<string[]>([categories[0]?.name]);

  const handleToggle = (catName: string) => {
    setExpanded((prev) =>
      prev.includes(catName)
        ? prev.filter((name) => name !== catName)
        : [...prev, catName],
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    catName: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(catName);
    }
  };

  return (
    <div className="bg-foreground/5 border-foreground/20 h-fit rounded-[1em] border p-[1em] text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-1 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
      <h2 className="mb-[0.5em] font-semibold">CATEGORY</h2>
      <div className="space-y-[0.5em]">
        {categories.map((cat) => {
          const isOpen = expanded.includes(cat.name);
          return (
            <div key={cat.name} className="relative pb-[1em]">
              <div className="from-foreground/10 via-foreground to-foreground/10 absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r"></div>
              <button
                className="relative mb-[0.5em] flex w-full items-center justify-between rounded py-[0.5em] font-semibold"
                aria-expanded={isOpen}
                aria-controls={`cat-panel-${cat.name}`}
                tabIndex={0}
                onClick={() => handleToggle(cat.name)}
                onKeyDown={(e) => handleKeyDown(e, cat.name)}
                type="button"
              >
                <span>{cat.name}</span>
                <span
                  className="transition-transform"
                  style={{
                    transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
                  }}
                >
                  <IoIosArrowDown />
                </span>
              </button>
              {isOpen && (
                <div
                  className="space-y-[0.5em]"
                  id={`cat-panel-${cat.name} border-b`}
                >
                  {cat.subCategories.map((sub) => {
                    const filterKey = `${cat.name}|${sub}`;
                    return (
                      <div key={sub}>
                        <label className="flex cursor-pointer items-center gap-2">
                          <Checkbox
                            checked={selectedFilters.includes(filterKey)}
                            onCheckedChange={() =>
                              handleFilterChange(filterKey)
                            }
                            aria-label={`Filter by ${cat.name} ${sub}`}
                            tabIndex={0}
                          />
                          <span>{sub}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilterSidebar;
