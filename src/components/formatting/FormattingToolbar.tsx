import React from 'react';
import { Bold, Italic, Underline, List } from 'lucide-react';
import FormattingButton from './FormattingButton';
import ColorPicker from './ColorPicker';

interface FormattingToolbarProps {
  activeFormats: Set<string>;
  currentColor: string;
  onFormatClick: (format: string) => void;
  onColorSelect: (color: string) => void;
  onListClick: () => void;
}

const FormattingToolbar: React.FC<FormattingToolbarProps> = ({
  activeFormats,
  currentColor,
  onFormatClick,
  onColorSelect,
  onListClick
}) => {
  return (
    <div className="flex justify-start gap-1 mb-1 p-1 bg-gray-50 rounded-md border">
      <FormattingButton
        onClick={() => onFormatClick('bold')}
        isActive={activeFormats.has('bold')}
        title="Negrito (Ctrl/Cmd + B)"
      >
        <Bold className="h-3 w-3" />
      </FormattingButton>
      <FormattingButton
        onClick={() => onFormatClick('italic')}
        isActive={activeFormats.has('italic')}
        title="Itálico (Ctrl/Cmd + I)"
      >
        <Italic className="h-3 w-3" />
      </FormattingButton>
      <FormattingButton
        onClick={() => onFormatClick('underline')}
        isActive={activeFormats.has('underline')}
        title="Sublinhado (Ctrl/Cmd + U)"
      >
        <Underline className="h-3 w-3" />
      </FormattingButton>
      <FormattingButton
        onClick={onListClick}
        isActive={activeFormats.has('list')}
        title="Lista"
      >
        <List className="h-3 w-3" />
      </FormattingButton>
      <ColorPicker
        currentColor={currentColor}
        onColorSelect={onColorSelect}
        isActive={activeFormats.has('color')}
      />
    </div>
  );
};

export default FormattingToolbar;