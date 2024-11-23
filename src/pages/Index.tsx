import BannerForm from "@/components/BannerForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Logo and Tagline Section */}
        <div className="flex flex-col items-center mb-12">
          <img 
            src="/lovable-uploads/7d7cb034-89c3-44ba-abe0-14e4388f44cf.png"
            alt="AIcademic Logo"
            className="w-64 h-auto mb-6"
          />
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Escreva, aprenda, conclua – com AIcademic
          </h2>
        </div>

        {/* Banner Generator Title */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Gerador de Banner Científico
        </h1>
        
        <BannerForm />
      </div>
    </div>
  );
};

export default Index;