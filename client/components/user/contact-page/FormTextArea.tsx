import { cn } from "@/lib/utils";
import React from "react";

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  error,
  id,
  className,
  ...props
}) => {
  return (
    <div className="relative mb-[2em]">
      <label htmlFor={id} className="font-light opacity-80">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className={cn(
          "border-foreground/15 focus:border-foreground/30 placeholder:text-foreground/80 mt-[0.4em] w-full rounded-[0.5em] border px-[1em] transition-colors focus:outline-none",
          className,
        )}
      />
      {error && (
        <p className="absolute top-full left-0 mt-[0.2em] text-[0.8em] font-light text-[#FF8E72]">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormTextArea;
