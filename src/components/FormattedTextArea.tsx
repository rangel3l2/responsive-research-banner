import React, { useEffect, useState } from 'react';
import TextArea from './formatting/TextArea';
import { FormattedTextAreaProps } from './formatting/types';
import { Check, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { MAX_CHARS_PER_PAGE } from '@/utils/docxStyles';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const FormattedTextArea: React.FC<FormattedTextAreaProps> = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  height,
  maxLines,
  fontSize,
  className = "",
  saveStatus,
}) => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  const getProgressColor = (progress: number) => {
    if (progress < 60) return "bg-green-500";
    if (progress < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  useEffect(() => {
    const plainText = value.replace(/<[^>]*>/g, '');
    const maxLength = name === 'resultsAndDiscussion' ? MAX_CHARS_PER_PAGE : 
      maxLines ? maxLines * 80 : MAX_CHARS_PER_PAGE; // Assuming average of 80 chars per line
    const currentProgress = (plainText.length / maxLength) * 100;
    setProgress(Math.min(currentProgress, 100));
  }, [value, name, maxLines]);

  const handleChange = (e: any) => {
    const plainText = e.target.value.replace(/<[^>]*>/g, '');
    
    if (name === 'resultsAndDiscussion' && plainText.length > MAX_CHARS_PER_PAGE) {
      toast({
        title: "Limite de conteúdo atingido",
        description: "O conteúdo excede o tamanho máximo permitido para uma página.",
        variant: "destructive",
      });
      return;
    }
    
    onChange(e);
  };

  return (
    <div className="space-y-1">
      <div className="relative">
        <TextArea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          height={height}
          maxLines={maxLines}
          fontSize={fontSize}
          className={className}
          disabled={name === 'resultsAndDiscussion' && value.replace(/<[^>]*>/g, '').length >= MAX_CHARS_PER_PAGE}
        />
        {saveStatus && (
          <div className="absolute right-2 bottom-2 flex items-center">
            {saveStatus.isSaving ? (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
            ) : saveStatus.isError ? (
              <X className="w-4 h-4 text-red-500" />
            ) : (
              <Check className={`w-4 h-4 ${saveStatus.lastSaved ? 'text-green-500' : 'text-gray-300'}`} />
            )}
          </div>
        )}
      </div>
      <div className="mt-1">
        <Progress 
          value={progress} 
          className={cn(
            "h-2 transition-all",
            getProgressColor(progress)
          )}
        />
      </div>
    </div>
  );
};

export default FormattedTextArea;