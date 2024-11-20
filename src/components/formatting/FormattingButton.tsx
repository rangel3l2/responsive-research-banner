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
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "h-8 w-8 p-0",
        isActive && "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
      )}
      title={title}
    >
      {children}
    </Button>
  );
};

export default FormattingButton;