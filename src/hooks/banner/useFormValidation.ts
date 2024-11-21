import { BannerFormData } from '@/models/formData';

export const useFormValidation = () => {
  const validateForm = (formData: BannerFormData) => {
    const requiredFields = [
      'title',
      'authors',
      'institution',
      'introduction',
      'methodology',
      'resultsAndDiscussion',
      'conclusion',
      'references',
    ];
    const newErrors: { [key: string]: boolean } = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!formData[field as keyof BannerFormData]) {
        newErrors[field] = true;
        isValid = false;
      }
    });

    return { isValid, errors: newErrors };
  };

  return {
    validateForm,
  };
};