import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormattingButtonProps {
  onClick: () => void;
  isActive: boolean;
  title: string;
  children: React.ReactNode;
}

const FormattingButton = ({ onClick, isActive, title, children }: FormattingButtonProps) => {
  return (
    <Button
      type="button"
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      className={cn(
        "h-6 w-6 p-1",
        isActive ? "bg-gray-200" : "hover:bg-gray-100"
      )}
      title={title}
    >
      {children}
    </Button>
  );
};

export default FormattingButton;