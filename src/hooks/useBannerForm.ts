import { useState, useCallback, useEffect } from 'react';
import { BannerFormData } from '@/models/formData';
import { generateBannerDocx } from '@/utils/docxGenerator';
import { useCookieStorage } from './banner/useCookieStorage';
import { useFormValidation } from './banner/useFormValidation';
import { SaveStatus, UseBannerFormReturn } from './banner/types';
import { MAX_IMAGE_SIZE_KB } from '@/utils/docxStyles';

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

export const useBannerForm = (): UseBannerFormReturn => {
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
  }, [formData]);

  useEffect(() => {
    const saveTimeout = setTimeout(handleSave, 1000);
    return () => clearTimeout(saveTimeout);
  }, [formData, handleSave]);

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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 2) {
      return;
    }

    files.forEach(file => {
      if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
        return;
      }
    });

    const newImages = [...formData.images, ...files];
    const newCaptions = [...formData.imageCaptions, ...Array(files.length).fill('')];
    
    setFormData(prev => ({
      ...prev,
      images: newImages,
      imageCaptions: newCaptions,
    }));

    const newUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newUrls]);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    setFormData(prev => {
      const newCaptions = [...prev.imageCaptions];
      newCaptions[index] = caption;
      return { ...prev, imageCaptions: newCaptions };
    });
  };

  const handleLogoUpload = (file: File) => {
    if (file.size <= MAX_IMAGE_SIZE_KB * 1024) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleImageInsert = () => {
    if (formData.images.length === 0) return;

    const textArea = document.querySelector(
      'textarea[name="resultsAndDiscussion"]'
    ) as HTMLTextAreaElement;
    if (!textArea) return;

    const cursorPosition = textArea.selectionStart;
    const currentText = formData.resultsAndDiscussion;
    const imageIndex = formData.images.length;
    const imageTag = `[IMG${imageIndex}]`;
    
    const newText = currentText.slice(0, cursorPosition) + 
                   imageTag + 
                   currentText.slice(cursorPosition);
    
    setFormData(prev => ({ ...prev, resultsAndDiscussion: newText }));
  };

  const loadSavedForm = () => {
    const savedData = loadFormFromCookies();
    if (savedData) {
      setFormData(prev => ({
        ...savedData,
        images: prev.images,
        imageCaptions: prev.imageCaptions,
      }));
      setSaveStatus({
        isSaving: false,
        isError: false,
        lastSaved: new Date(),
      });
    }
  };

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