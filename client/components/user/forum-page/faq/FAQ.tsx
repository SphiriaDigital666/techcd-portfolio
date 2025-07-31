import React from "react";

import SectionTitle from "./SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/user/ui/Accordion";

const faqData = [
  {
    id: "001",
    title: "Is this program beginner-friendly?",
    desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil natus qui blanditiis accusamus repudiandae minima molestiae esse omnis libero quas. Explicabo maxime quaerat quidem placeat alias aliquam distinctio id laborum voluptas soluta, rem consectetur omnis sint aspernatur maiores ipsum. Ea qui molestiae libero nihil sunt doloremque consequatur soluta sapiente eum alias? Nulla enim cumque alias? Asperiores rem ratione inventore laudantium, numquam ipsa, voluptatum excepturi nihil porro hic repellendus quae laborum doloribus voluptatibus dicta cupiditate at aspernatur nemo maxime provident? Ab asperiores facere eum libero similique, temporibus quos, necessitatibus, saepe earum ullam velit. Non quibusdam voluptas dolorem odio rem ipsam temporibus.",
  },
  {
    id: "002",
    title: "Is this program beginner-friendly?",
    desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil natus qui blanditiis accusamus repudiandae minima molestiae esse omnis libero quas. Explicabo maxime quaerat quidem placeat alias aliquam distinctio id laborum voluptas soluta, rem consectetur omnis sint aspernatur maiores ipsum. Ea qui molestiae libero nihil sunt doloremque consequatur soluta sapiente eum alias? Nulla enim cumque alias? Asperiores rem ratione inventore laudantium, numquam ipsa, voluptatum excepturi nihil porro hic repellendus quae laborum doloribus voluptatibus dicta cupiditate at aspernatur nemo maxime provident? Ab asperiores facere eum libero similique, temporibus quos, necessitatibus, saepe earum ullam velit. Non quibusdam voluptas dolorem odio rem ipsam temporibus.",
  },
  {
    id: "003",
    title: "Is this program beginner-friendly?",
    desc: "  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil natus qui blanditiis accusamus repudiandae minima molestiae esse omnis libero quas. Explicabo maxime quaerat quidem placeat alias aliquam distinctio id laborum voluptas soluta, rem consectetur omnis sint aspernatur maiores ipsum. Ea qui molestiae libero nihil sunt doloremque consequatur soluta sapiente eum alias? Nulla enim cumque alias? Asperiores rem ratione inventore laudantium, numquam ipsa, voluptatum excepturi nihil porro hic repellendus quae laborum doloribus voluptatibus dicta cupiditate at aspernatur nemo maxime provident? Ab asperiores facere eum libero similique, temporibus quos, necessitatibus, saepe earum ullam velit. Non quibusdam voluptas dolorem odio rem ipsam temporibus.",
  },
];
const FAQ = () => {
  return (
    <section className="relative">
      <div className="from-primary absolute top-1/2 left-0 aspect-square w-2/5 -translate-x-1/2 rounded-full bg-radial to-transparent blur-[5em]"></div>

      <div className="px-container relative container mx-auto mt-[4em] pb-[3em]">
        <SectionTitle />
        <Accordion type="single" collapsible className="mt-[2.5em]">
          {faqData.map(({ desc, id, title }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-6 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
                {desc}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
