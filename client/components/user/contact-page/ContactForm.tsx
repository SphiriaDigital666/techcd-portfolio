import React from "react";
import MessageBubbleIcon from "../icons/MessageBubbleIcon";
import FormArea from "./FormArea";

const ContactForm = () => {
  return (
    <section>
      <div className="px-container relative container mx-auto my-[2em]">
        <div className="bg-foreground/5 border-foreground/10 grid grid-cols-1 gap-[1em] rounded-[1em] border p-[2em] lg:grid-cols-2">
          <div>
            <p className="text-primary text-center text-[26px] leading-[1] sm:text-[34px] md:text-[43px] lg:shrink-0 lg:text-left lg:text-[51px] xl:text-[60px] 2xl:text-[68px]">
              Have inquiries? Reach out via message
            </p>
            <MessageBubbleIcon className="mx-auto mt-[1em] w-1/2" />
          </div>

          <div>
            <FormArea />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
