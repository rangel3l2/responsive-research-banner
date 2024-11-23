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
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-gray-300";
    if (progress < 60) return "bg-gray-400";
    if (progress < 80) return "bg-gray-500";
    if (progress < 90) return "bg-gray-600";
    return "bg-gray-700";
  };

  const getMaxLength = () => {
    if (name === 'resultsAndDiscussion') return MAX_CHARS_PER_PAGE;
    return maxLines * 80;
  };

  const plainText = value.replace(/<[^>]*>/g, '');
  const isDisabled = plainText.length >= getMaxLength();

  useEffect(() => {
    const maxLength = getMaxLength();
    const currentProgress = (plainText.length / maxLength) * 100;
    setProgress(Math.min(currentProgress, 100));
  }, [value, name, maxLines, plainText]);

  const handleChange = (e: any) => {
    const newPlainText = e.target.value.replace(/<[^>]*>/g, '');
    const maxLength = getMaxLength();
    
    if (newPlainText.length > maxLength) {
      toast({
        title: "Limite de conteúdo atingido",
        description: `O conteúdo excede o tamanho máximo permitido de ${maxLines} linhas.`,
        variant: "destructive",
      });
      return;
    }
    
    // Reset typing timeout
    if (typingTimeout) clearTimeout(typingTimeout);
    
    // Show progress bar
    setIsTyping(true);
    
    // Set new timeout to hide progress bar after 1.5 seconds of no typing
    const newTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
    
    setTypingTimeout(newTimeout);
    onChange(e);
  };

  return (
    <div className="relative w-full space-y-1">
      <div className="w-full">
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
          disabled={isDisabled}
          readOnly={isDisabled}
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
      {isTyping && (
        <div className="w-full mt-2">
          <Progress 
            value={progress} 
            className={cn(
              "h-1.5 transition-all",
              getProgressColor(progress)
            )}
          />
          <div className="text-xs text-gray-500 text-right mt-1">
            {plainText.length}/{getMaxLength()} caracteres
          </div>
        </div>
      )}
    </div>
  );
};

export default FormattedTextArea;