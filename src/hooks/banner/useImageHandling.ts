import { BannerFormData } from '@/models/formData';
import { MAX_IMAGE_SIZE_KB } from '@/utils/docxStyles';

export const useImageHandling = (
  setFormData: React.Dispatch<React.SetStateAction<BannerFormData>>,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
) => {
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

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
      imageCaptions: [...prev.imageCaptions, ...Array(files.length).fill('')],
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

  return {
    handleImageUpload,
    handleCaptionChange,
    handleLogoUpload,
    handleImageInsert,
  };
};