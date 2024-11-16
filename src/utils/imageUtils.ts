export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const createImageRunOptions = (base64Data: string, width: number, height: number) => ({
  data: base64Data.split(',')[1],
  transformation: {
    width,
    height,
  },
  type: "svg" as const,
  fallback: {
    type: "png",
    width,
    height,
  }
});