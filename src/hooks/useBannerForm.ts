import { useState, useCallback, useEffect } from 'react';
import { BannerFormData } from '@/models/formData';
import { generateBannerDocx } from '@/utils/docxGenerator';
import { useCookieStorage } from './banner/useCookieStorage';
import { useFormValidation } from './banner/useFormValidation';
import { SaveStatus } from './banner/types';
import { useFormActions } from './banner/useFormActions';
import { useImageHandling } from './banner/useImageHandling';

const getInitialFormData = (): BannerFormData => ({
  title: '',
  authors: '',
  institution: '',
  email: '',
  introduction: '',
  objective: '',
  methodology: '',
  resultsAndDiscussion: '',
  conclusion: '',
  references: '',
  images: [],
  imageCaptions: [],
});

export const useBannerForm = () => {
  const [formData, setFormData] = useState<BannerFormData>(getInitialFormData());
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({
    isSaving: false,
    isError: false,
    lastSaved: null,
  });

  const { saveFormToCookies, loadFormFromCookies } = useCookieStorage();
  const { validateForm } = useFormValidation();
  
  const { resetForm, handleInputChange } = useFormActions(
    setFormData,
    setImageUrls,
    setErrors,
    setSaveStatus,
    getInitialFormData
  );

  const {
    handleImageUpload,
    handleCaptionChange,
    handleLogoUpload,
    handleImageInsert,
  } = useImageHandling(formData, setFormData, setImageUrls);

  const handleSave = useCallback(() => {
    if (!Object.values(formData).some(value => value !== '' && value !== null && (!Array.isArray(value) || value.length > 0))) {
      setSaveStatus({
        isSaving: false,
        isError: false,
        lastSaved: null,
      });
      return;
    }

    setSaveStatus(prev => ({ ...prev, isSaving: true }));
    try {
      saveFormToCookies(formData);
      setSaveStatus({
        isSaving: false,
        isError: false,
        lastSaved: new Date(),
      });
    } catch (error) {
      setSaveStatus({
        isSaving: false,
        isError: true,
        lastSaved: null,
      });
    }
  }, [formData, saveFormToCookies]);

  useEffect(() => {
    const saveTimeout = setTimeout(handleSave, 1000);
    return () => clearTimeout(saveTimeout);
  }, [formData, handleSave]);

  const loadSavedForm = () => {
    const savedData = loadFormFromCookies();
    if (savedData) {
      // Preserve current images and captions while loading other data
      const currentImages = formData.images;
      const currentCaptions = formData.imageCaptions;
      const currentImageUrls = imageUrls;
      
      setFormData({
        ...savedData,
        images: currentImages,
        imageCaptions: currentCaptions,
      });
      
      setSaveStatus({
        isSaving: false,
        isError: false,
        lastSaved: new Date(),
      });
    }
  };

  const downloadAsDocx = async () => {
    const { isValid, errors: newErrors } = validateForm(formData);
    setErrors(newErrors);
    
    if (!isValid) return;

    try {
      const blob = await generateBannerDocx(formData);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'banner-cientifico.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating DOCX:', error);
    }
  };

  return {
    formData,
    errors,
    imageUrls,
    saveStatus,
    handleInputChange,
    handleImageUpload,
    handleCaptionChange,
    handleLogoUpload,
    handleImageInsert,
    downloadAsDocx,
    setFormData,
    loadFormFromCookies: loadSavedForm,
    resetForm,
  };
};
