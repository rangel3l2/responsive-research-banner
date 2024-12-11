import { Document, Packer } from 'docx';
import { BannerFormData } from '@/models/formData';
import { layouts } from './bannerLayouts';

export const generateBannerDocx = async (formData: BannerFormData) => {
  try {
    const createLayout = layouts[formData.selectedLayout || 'classic'];
    const section = await createLayout(formData);

    const doc = new Document({
      sections: [section],
    });

    return await Packer.toBlob(doc);
  } catch (error) {
    console.error('Erro ao gerar DOCX:', error);
    throw error;
  }
};