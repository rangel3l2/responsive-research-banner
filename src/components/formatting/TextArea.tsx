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
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
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
  disabled,
  readOnly,
  onFocus,
  onBlur
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
          toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
          removePlugins: ['MediaEmbed', 'Table'],
          fontSize: {
            options: [
              'default',
              9,
              11,
              13,
              'default',
              17,
              19,
              21
            ]
          }
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
        disabled={disabled || readOnly}
        onFocus={(event, editor) => {
          onFocus?.();
        }}
        onBlur={(event, editor) => {
          onBlur?.();
        }}
      />
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;