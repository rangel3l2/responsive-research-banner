import { ChangeEvent } from 'react';

export interface BannerFormData {
  title: string;
  authors: string;
  institution: string;
  email?: string;
  introduction: string;
  objective: string;
  methodology: string;
  resultsAndDiscussion: string;
  conclusion: string;
  references: string;
  images: File[];
  imageCaptions: string[];
  logo?: File;
}

export interface BannerInputsProps {
  formData: BannerFormData;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  imageUrls: string[];
  imageCaptions: string[];
  onCaptionChange: (index: number, caption: string) => void;
  onImageInsert: () => void;
  errors: { [key: string]: boolean };
}

export interface FormattedTextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  height: string;
  maxLines: number;
  fontSize: string;
  className?: string;
}