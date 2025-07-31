import React from "react";

type PlanCardProps = {
  title: string;
  price: number;
};

const PlanCard = ({ title, price }: PlanCardProps) => {
  return (
    <div className="border-foreground/30 bg-foreground/10 w-fit space-y-[1em] rounded-[0.3em] border p-[1em] text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
      <p className="font-bold uppercase">{title}</p>

      <div className="flex items-baseline gap-[0.1em] text-[22px] font-semibold sm:text-[24px] md:text-[26px] lg:text-[30px] xl:text-[32px] 2xl:text-[34px]">
        <p>${price}</p>
        <p className="text-[12px] font-normal sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
          /month
        </p>
      </div>

      <button className="bg-primary rounded-[0.4em] px-[3em] py-[0.7em] text-[12px] font-medium sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[17px]">
        Get started
      </button>
    </div>
  );
};

export default PlanCard;
