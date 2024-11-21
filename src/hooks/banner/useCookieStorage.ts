import Cookies from 'js-cookie';
import { BannerFormData } from '@/models/formData';

const COOKIE_KEY = 'banner_form_data';

export const useCookieStorage = () => {
  const saveFormToCookies = (formData: BannerFormData) => {
    const dataToSave = {
      ...formData,
      images: [], // We don't save images in cookies
    };
    Cookies.set(COOKIE_KEY, JSON.stringify(dataToSave), { expires: 7 }); // Expires in 7 days
  };

  const loadFormFromCookies = () => {
    const savedData = Cookies.get(COOKIE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved data:', error);
        return null;
      }
    }
    return null;
  };

  return {
    saveFormToCookies,
    loadFormFromCookies,
  };
};