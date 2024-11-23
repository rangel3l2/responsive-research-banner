import React, { useEffect, useState } from 'react';
import TextArea from './formatting/TextArea';
import { FormattedTextAreaProps } from './formatting/types';
import { Check, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { MAX_CHARS_PER_PAGE } from '@/utils/docxStyles';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    
    if (typingTimeout) clearTimeout(typingTimeout);
    
    setIsTyping(true);
    
    const newTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
    
    setTypingTimeout(newTimeout);
    onChange(e);
  };

  return (
    <Card className="w-full" style={{ 
      width: 'auto',
      height: 'auto',
      display: 'block',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <CardContent className="p-4">
        <ScrollArea className="relative w-full" style={{ maxHeight: height }}>
          <TextArea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            height={height}
            maxLines={maxLines}
            fontSize={fontSize}
            className={`${className} w-full`}
            disabled={isDisabled}
            readOnly={isDisabled}
            style={{
              width: '100%',
              maxWidth: 'calc(100% - 32px)',
              overflow: 'visible',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.5',
              padding: '0.75rem',
              marginRight: '32px'
            }}
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
        </ScrollArea>
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
      </CardContent>
    </Card>
  );
};

export default FormattedTextArea;