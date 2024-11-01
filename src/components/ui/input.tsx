import { cn } from "@/lib/utils"
import * as React from "react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface InputCurrencyProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputCurrency: React.FC<InputCurrencyProps> = ({ id, value, onChange }) => {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        €
      </span>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        className="pl-7"
      />
    </div>
  );
};

interface InputPercentageProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPercentage: React.FC<InputPercentageProps> = ({ id, value, onChange }) => {
  return (
    <div className="relative">
      <Input
        id={id}
        value={value}
        onChange={onChange}
        className="pr-8"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        %
      </span>
    </div>
  );
};

interface InputYearsProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputYears: React.FC<InputYearsProps> = ({ id, value, onChange }) => {
  return (
    <div className="relative">
      <Input
        id={id}
        value={value}
        onChange={onChange}
        className="pr-8"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        years
      </span>
    </div>
  );
};

export { Input, InputCurrency, InputPercentage, InputYears }
