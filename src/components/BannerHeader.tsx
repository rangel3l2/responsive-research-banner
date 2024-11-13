import React from 'react';

const BannerHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img 
        id="schoolLogo"
        src="/escola-estadual-logo.png" 
        alt="Escola Estadual Padre João Tomes"
        className="w-[10%] object-contain"
      />
      <input
        type="text"
        placeholder="Digite o título da sua pesquisa"
        className="w-[90%] text-3xl font-bold border-none outline-none focus:ring-0"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
};

export default BannerHeader;