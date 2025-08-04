import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  error,
  ...props
}) => {
  return (
    <div className="relative mb-[1.8em] flex flex-col">
      <input
        placeholder={placeholder}
        {...props}
        className="border-foreground/15 focus:border-foreground/20 placeholder:text-foreground/80 h-[2.5em] rounded-[0.5em] border px-[1em] transition-colors focus:outline-none"
      />
      {error && (
        <p className="absolute top-full left-0 mt-[0.2em] text-[0.8em] text-[#FF8E72]">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
