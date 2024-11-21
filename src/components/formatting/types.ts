export interface FormattedRange {
  start: number;
  end: number;
  formats: Set<string>;
  color?: string;
}

export interface FormattedTextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height: string;
  maxLines: number;
  fontSize: string;
  className?: string;
}