import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface InputContainerProps {
  title: string;
  tooltip?: string;
  value: number;
  onChange: (value: number) => void;
  type: 'currency' | 'percentage' | 'years';
}

const InputContainer = ({
                          title,
                          tooltip,
                          value,
                          onChange,
                          type
                        }: InputContainerProps) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value).replace('€', '').trim();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      const numericValue = type === 'currency'
        ? Number(inputValue.replace(/,/g, ''))
        : Number(inputValue);
      onChange(numericValue);
      setInputValue(type === 'currency' ? formatCurrency(numericValue) : numericValue.toString());
    }, 600);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    setInputValue(type === 'currency' ? formatCurrency(value) : value.toString());
  }, [value, type]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <Label htmlFor={`input-${title}`} className="text-sm font-medium">
          {title}
        </Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400"/>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative">
        {type === 'currency' && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            €
          </span>
        )}
        <Input
          id={`input-${title}`}
          value={inputValue}
          onChange={handleChange}
          className={`${type === 'currency' ? 'pl-7' : ''} ${type === 'percentage' || type === 'years' ? 'pr-8' : ''}`}
        />
        {type === 'percentage' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            %
          </span>
        )}
        {type === 'years' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            years
          </span>
        )}
      </div>
    </div>
  );
};

export default InputContainer;
