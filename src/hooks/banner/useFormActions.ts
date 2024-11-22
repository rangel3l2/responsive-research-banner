import { BannerFormData } from '@/models/formData';
import { SaveStatus } from './types';

export const useFormActions = (
  setFormData: React.Dispatch<React.SetStateAction<BannerFormData>>,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
  setSaveStatus: React.Dispatch<React.SetStateAction<SaveStatus>>,
  getInitialFormData: () => BannerFormData
) => {
  const resetForm = () => {
    setFormData(getInitialFormData());
    setImageUrls([]);
    setErrors({});
    setSaveStatus({
      isSaving: false,
      isError: false,
      lastSaved: null,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveStatus({
      isSaving: false,
      isError: false,
      lastSaved: null,
    });
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  return {
    resetForm,
    handleInputChange,
  };
};