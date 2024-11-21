import { KeyboardEvent } from 'react';

export const useKeyboardShortcuts = (applyFormatToSelection: (format: string) => void) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const modifier = e.ctrlKey || e.metaKey;
    
    if (modifier) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          applyFormatToSelection('bold');
          break;
        case 'i':
          e.preventDefault();
          applyFormatToSelection('italic');
          break;
        case 'u':
          e.preventDefault();
          applyFormatToSelection('underline');
          break;
      }
    }
  };

  return { handleKeyDown };
};