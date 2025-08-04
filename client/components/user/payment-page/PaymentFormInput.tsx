import React from "react";

interface PaymentFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
}

const PaymentFormInput: React.FC<PaymentFormInputProps> = ({
  placeholder,
  error,
  ...props
}) => {
  return (
    <div className="relative mb-[1.8em] flex flex-col">
      <input
        placeholder={placeholder}
        {...props}
        className="border-foreground/15 focus:border-foreground/20 h-[2.3em] rounded-[0.5em] border px-[1em] transition-colors focus:outline-none"
      />
      {error && (
        <p className="absolute top-full left-0 mt-[0.2em] text-[0.8em] text-[#FF8E72]">
          {error}
        </p>
      )}
    </div>
  );
};

export default PaymentFormInput;
