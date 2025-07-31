import React from "react";
import { FiHelpCircle } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { BsDash } from "react-icons/bs";
import PlanCard from "./PlanCard";

const plans = [
  { name: "Free", price: 0 },
  { name: "Pro", price: 20 },
  { name: "Business", price: 40 },
  { name: "Enterprise", price: 100 },
];

const features = [
  {
    section: "FEATURES",
    items: [
      {
        name: "Customizable Workflows",
        info: true,
        values: ["100", "100", "100", "Unlimited"],
      },
      {
        name: "Project Planning",
        info: true,
        values: ["check", "check", "check", "check"],
      },
      {
        name: "Time Tracking",
        info: true,
        values: ["check", "check", "check", "check"],
      },
    ],
  },
  {
    section: "FEATURES",
    items: [
      {
        name: "Gantt Charts",
        info: true,
        values: ["dash", "dash", "check", "check"],
      },
      {
        name: "Agile Methodology Support",
        info: true,
        values: ["check", "check", "check", "check"],
      },
      {
        name: "Reporting and Analytics",
        info: true,
        values: ["dash", "check", "check", "check"],
      },
      {
        name: "Team and Individual Dashboards",
        info: true,
        values: ["dash", "check", "check", "check"],
      },
    ],
  },
  {
    section: "FEATURES",
    items: [
      {
        name: "Document Management",
        info: true,
        values: ["dash", "dash", "check", "check"],
      },
      {
        name: "Client Collaboration",
        info: true,
        values: ["dash", "dash", "check", "check"],
      },
      {
        name: "Mobile App Integration",
        info: true,
        values: ["dash", "dash", "dash", "check"],
      },
    ],
  },
];

const renderValue = (val: string) => {
  if (val === "check")
    return (
      <div className="bg-primary mx-auto w-fit rounded-full p-[0.2em] text-[0.8em]">
        <IoCheckmarkSharp className="text-foreground bg-primary mx-auto rounded-full" />
      </div>
    );
  if (val === "dash") return <BsDash className="text-foreground/40 mx-auto" />;
  if (val === "Unlimited")
    return (
      <span className="text-primary mx-auto font-semibold">Unlimited</span>
    );
  return (
    <span className="text-foreground/40 mx-auto font-semibold">{val}</span>
  );
};

const FeatureComparisonTable = () => {
  return (
    <div className="hidden lg:block">
      <table className="w-full">
        <thead>
          <tr>
            <th></th>
            {plans.map(({ name, price }) => (
              <th key={name} className="ps-[1em] pb-[1em]">
                <PlanCard title={name} price={price} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((group, i) => (
            <React.Fragment key={i}>
              <tr className="">
                <td
                  colSpan={plans.length + 1}
                  className="bg-foreground/20 mb-[0.4em] rounded-[0.4em] px-[1em] py-[0.8em] text-[14px] font-semibold sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px]"
                >
                  {group.section}
                </td>
              </tr>
              {group.items.map((item, j) => (
                <tr
                  key={j}
                  className="relative text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]"
                >
                  <td className="flex items-center justify-between gap-[1em] px-[1em] py-[1.5em] font-medium">
                    {item.name}
                    {item.info && (
                      <FiHelpCircle
                        className="text-foreground/40 shrink-0"
                        size={16}
                      />
                    )}
                    <span className="via-foreground from-foreground/10 to-foreground/10 absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r"></span>
                  </td>
                  {item.values.map((val, k) => (
                    <td
                      key={k}
                      className="px-[1em] py-[1.5em] text-center align-middle"
                    >
                      {renderValue(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeatureComparisonTable;
