import { useState } from 'react';
import { toast } from 'sonner';
import { BannerFormData } from '@/models/formData';
import { MAX_IMAGE_SIZE_KB } from '@/utils/docxStyles';
import { generateBannerDocx } from '@/utils/docxGenerator';

export const useBannerForm = () => {
  const [formData, setFormData] = useState<BannerFormData>({
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
    logo: undefined,
  });

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const validateImageSize = (file: File) => {
    return file.size <= MAX_IMAGE_SIZE_KB * 1024;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const maxLengths: { [key: string]: number } = {
      title: 120,
      authors: 150,
      introduction: 500,
      methodology: 400,
      resultsAndDiscussion: 600,
      conclusion: 400,
      references: 300,
    };

    if (value.length > maxLengths[name]) {
      toast.error(`O texto em ${name} excede o limite permitido.`);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 2) {
      toast.error("Máximo de 2 imagens permitido");
      return;
    }

    for (const file of files) {
      if (!validateImageSize(file)) {
        toast.error(`A imagem ${file.name} é muito grande. O tamanho máximo permitido é ${MAX_IMAGE_SIZE_KB}KB.`);
        return;
      }
    }

    const newImages = [...formData.images, ...files];
    const newCaptions = [...formData.imageCaptions, ...Array(files.length).fill('')];
    setFormData((prev) => ({ 
      ...prev, 
      images: newImages,
      imageCaptions: newCaptions,
    }));

    const newUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    setFormData((prev) => {
      const newCaptions = [...prev.imageCaptions];
      newCaptions[index] = caption;
      return { ...prev, imageCaptions: newCaptions };
    });
  };

  const handleLogoUpload = (file: File) => {
    if (!validateImageSize(file)) {
      toast.error(`O logo é muito grande. O tamanho máximo permitido é ${MAX_IMAGE_SIZE_KB}KB.`);
      return;
    }
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const validateForm = () => {
    const requiredFields = ['title', 'authors', 'institution', 'introduction', 'methodology', 'resultsAndDiscussion', 'conclusion', 'references'];
    const newErrors: { [key: string]: boolean } = {};
    let isValid = true;

    requiredFields.forEach(field => {
      if (!formData[field as keyof BannerFormData]) {
        newErrors[field] = true;
        isValid = false;

        if (field === 'title') {
          toast.error("O título é obrigatório");
        }
      }
    });

    setErrors(newErrors);
    if (!isValid && !newErrors.title) {
      toast.error("Por favor, preencha todos os campos obrigatórios destacados em vermelho.");
    }
    return isValid;
  };

  const downloadAsDocx = async () => {
    if (!validateForm()) return;

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
      toast.success("Banner científico gerado com sucesso!");
    } catch (error) {
      console.error('Erro ao gerar DOCX:', error);
      toast.error("Erro ao gerar o banner. Por favor, verifique os dados e tente novamente.");
    }
  };

  const handleImageInsert = () => {
    if (formData.images.length > 0) {
      const textArea = document.querySelector('textarea[name="resultsAndDiscussion"]') as HTMLTextAreaElement;
      if (textArea) {
        const cursorPosition = textArea.selectionStart;
        const currentText = formData.resultsAndDiscussion;
        const imageTag = `[IMG${formData.images.length}]`;
        const newText = currentText.slice(0, cursorPosition) + imageTag + currentText.slice(cursorPosition);
        
        setFormData(prev => ({ ...prev, resultsAndDiscussion: newText }));
        toast.success('Imagem inserida no texto com sucesso!');
        
        setTimeout(() => {
          textArea.focus();
          textArea.setSelectionRange(cursorPosition + imageTag.length, cursorPosition + imageTag.length);
        }, 0);
      }
    } else {
      toast.error('Nenhuma imagem disponível para inserir.');
    }
  };

  return {
    formData,
    errors,
    imageUrls,
    handleInputChange,
    handleImageUpload,
    handleCaptionChange,
    handleLogoUpload,
    handleImageInsert,
    downloadAsDocx,
    setFormData
  };
};