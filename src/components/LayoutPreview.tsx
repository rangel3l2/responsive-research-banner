import React from 'react';
import { Card } from "@/components/ui/card";
import { LayoutType } from '@/utils/bannerLayouts';

interface LayoutPreviewProps {
  layout: LayoutType;
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ layout }) => {
  const getLayoutPreview = () => {
    switch (layout) {
      case 'classic':
        return (
          <div className="w-full h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2">
            <div className="flex h-full">
              <div className="w-1/2 border-r border-gray-300 p-2">
                <div className="h-3 w-3/4 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-1/2 p-2">
                <div className="h-3 w-2/3 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'modern':
        return (
          <div className="w-full h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2">
            <div className="flex h-full">
              <div className="w-1/3 border-r border-gray-300 p-2">
                <div className="h-3 w-3/4 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="w-1/3 border-r border-gray-300 p-2">
                <div className="h-3 w-2/3 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-1/3 p-2">
                <div className="h-3 w-1/2 bg-gray-200 mb-2 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        );
      case 'zFlow':
        return (
          <div className="w-full h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2">
            <div className="h-full flex flex-col justify-between">
              <div className="flex">
                <div className="w-1/2">
                  <div className="h-3 w-3/4 bg-gray-200 mb-1 rounded"></div>
                </div>
                <div className="w-1/2 flex justify-end">
                  <div className="h-3 w-2/3 bg-gray-200 mb-1 rounded"></div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <div className="h-3 w-2/3 bg-gray-200 mb-1 rounded"></div>
                </div>
                <div className="w-1/2 flex justify-end">
                  <div className="h-3 w-3/4 bg-gray-200 mb-1 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'circular':
        return (
          <div className="w-full h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2">
            <div className="h-full flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
                <div className="absolute inset-2 rounded-full border-2 border-gray-300"></div>
                <div className="absolute inset-4 rounded-full border-2 border-gray-400"></div>
                <div className="absolute inset-6 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        );
      case 'hierarchical':
        return (
          <div className="w-full h-40 bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2">
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-center">
                <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-center">
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        );
    }
  };

  const getLayoutDescription = () => {
    switch (layout) {
      case 'classic':
        return 'Layout clássico em duas colunas, ideal para apresentação tradicional de conteúdo científico.';
      case 'modern':
        return 'Layout moderno em três colunas, oferecendo melhor distribuição visual do conteúdo.';
      case 'zFlow':
        return 'Layout em formato Z, guiando o olhar do leitor de forma natural pelo conteúdo.';
      case 'circular':
        return 'Layout circular com o objetivo no centro, ideal para mostrar relações entre os elementos.';
      case 'hierarchical':
        return 'Layout hierárquico, organizando o conteúdo por níveis de importância.';
    }
  };

  return (
    <Card className="p-4">
      {getLayoutPreview()}
      <p className="text-sm text-gray-600 mt-2">{getLayoutDescription()}</p>
    </Card>
  );
};

export default LayoutPreview;