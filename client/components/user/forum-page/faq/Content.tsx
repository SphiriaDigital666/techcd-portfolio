"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/user/ui/Accordion";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

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

const Content = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tween = gsap.from(".faq-item", {
        opacity: 0,
        y: "0.5em",
        stagger: 0.2,
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          once: true,
        },
      });

      return () => tween.kill();
    },
    { scope: container },
  );

  return (
    <Accordion ref={container} type="single" collapsible className="mt-[2.5em]">
      {faqData.map(({ desc, id, title }) => (
        <AccordionItem key={id} value={id} className="faq-item">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent className="text-[13px] sm:text-[15px] md:text-[17px] lg:col-span-6 lg:text-[19px] xl:text-[20px] 2xl:text-[21px]">
            {desc}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Content;
