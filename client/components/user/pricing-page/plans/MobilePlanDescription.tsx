import React from "react";

import { FiHelpCircle } from "react-icons/fi";
import { FaCheck, FaMinus } from "react-icons/fa";
import PlanCard from "./PlanCard";

const features = [
  {
    section: "FEATURES",
    items: [
      { name: "Customizable Workflows", info: true, value: "100" },
      { name: "Project Planning", info: true, value: "check" },
      { name: "Time Tracking", info: true, value: "check" },
    ],
  },
  {
    section: "FEATURES",
    items: [
      { name: "Gantt Charts", info: true, value: "dash" },
      { name: "Agile Methodology Support", info: true, value: "check" },
      { name: "Reporting and Analytics", info: true, value: "dash" },
      { name: "Team and Individual Dashboards", info: true, value: "dash" },
    ],
  },
  {
    section: "FEATURES",
    items: [
      { name: "Document Management", info: true, value: "dash" },
      { name: "Client Collaboration", info: true, value: "dash" },
      { name: "Mobile App Integration", info: true, value: "dash" },
    ],
  },
];

const MobilePlanDescription = () => {
  return (
    <div className="mx-auto flex w-fit flex-col items-end gap-[1em] lg:hidden">
      <PlanCard title="Free" price={0} />
      <div className="w-fit">
        {features.map((group, i) => (
          <div key={i}>
            <div className="bg-foreground/20 mb-[0.4em] rounded-[0.4em] px-[1em] py-[0.8em] text-[14px] font-semibold sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]">
              {group.section}
            </div>
            <div className="rounded-[0.4em] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
              {group.items.map((item, j) => (
                <div
                  key={j}
                  className="relative flex items-center justify-between gap-[4em] px-[1em] py-[1.5em]"
                >
                  <div className="flex items-center gap-[0.3em]">
                    <span>{item.name}</span>
                    {item.info && (
                      <FiHelpCircle className="text-foreground/50" size={16} />
                    )}
                  </div>

                  <div>
                    {item.value === "check" && (
                      <FaCheck className="text-primary" />
                    )}
                    {item.value === "dash" && (
                      <FaMinus className="text-neutral-500" />
                    )}
                    {item.value !== "check" && item.value !== "dash" && (
                      <span className="font-semibold text-neutral-300">
                        {item.value}
                      </span>
                    )}
                  </div>

                  <div className="via-foreground from-foreground/10 to-foreground/10 absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobilePlanDescription;
