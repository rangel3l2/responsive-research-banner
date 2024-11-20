import { ImageRun, Paragraph, AlignmentType, TextRun } from 'docx';
import { convertImageToBase64, createImageRunOptions } from './imageUtils';

export const createImageParagraphs = async (images: File[], captions: string[]) => {
  const paragraphs = [];
  
  if (images.length > 0) {
    const imageBase64Promises = images.map(convertImageToBase64);
    const imageBase64Results = await Promise.all(imageBase64Promises);
    
    // Create a row of images
    const imageParagraph = new Paragraph({
      children: imageBase64Results.map(base64 => 
        new ImageRun(createImageRunOptions(base64, 200, 150))
      ),
      spacing: { before: 200, after: 200 },
      alignment: AlignmentType.CENTER,
    });
    
    paragraphs.push(imageParagraph);
    
    // Add captions
    captions.forEach(caption => {
      if (caption) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: caption })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 200 },
          })
        );
      }
    });
  }
  
  return paragraphs;
};

export const createLogoHeader = async (logo: File | undefined, defaultLogoPath: string) => {
  let logoBase64;
  
  if (logo) {
    logoBase64 = await convertImageToBase64(logo);
  } else {
    // Use default logo
    const response = await fetch(defaultLogoPath);
    const blob = await response.blob();
    logoBase64 = await convertImageToBase64(new File([blob], 'default-logo.png'));
  }
  
  return {
    children: [
      new Paragraph({
        children: [
          new ImageRun(createImageRunOptions(logoBase64, 100, 100))
        ],
        alignment: AlignmentType.LEFT,
        spacing: { after: 200 },
      })
    ]
  };
};