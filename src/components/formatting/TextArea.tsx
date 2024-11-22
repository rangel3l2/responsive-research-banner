import React, { forwardRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface TextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  onKeyDown?: (e: any) => void;
  height: string;
  maxLines: number;
  fontSize: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  id,
  name,
  placeholder,
  value,
  onChange,
  height,
  className = "",
  style,
  disabled
}, ref) => {
  return (
    <div 
      className={`w-full ${height} ${className}`}
      style={{
        ...style,
        minHeight: '150px'
      }}
    >
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          placeholder: placeholder,
          toolbar: ['bold', 'italic', 'underline', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({
            target: {
              name: name,
              value: data
            }
          });
        }}
        disabled={disabled}
      />
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;