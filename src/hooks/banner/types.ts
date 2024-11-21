import { BannerFormData } from '@/models/formData';

export interface SaveStatus {
  isSaving: boolean;
  isError: boolean;
  lastSaved: Date | null;
}

export interface UseBannerFormReturn {
  formData: BannerFormData;
  errors: { [key: string]: boolean };
  imageUrls: string[];
  saveStatus: SaveStatus;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCaptionChange: (index: number, caption: string) => void;
  handleLogoUpload: (file: File) => void;
  handleImageInsert: () => void;
  downloadAsDocx: () => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<BannerFormData>>;
  loadFormFromCookies: () => void;
  resetForm: () => void;
}