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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrls: string[];
  imageCaptions: string[];
  onCaptionChange: (index: number, caption: string) => void;
  onImageInsert: () => void;
  errors: { [key: string]: boolean };
}