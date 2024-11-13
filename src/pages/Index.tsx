import BannerForm from "@/components/BannerForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Gerador de Banner Científico
        </h1>
        <BannerForm />
      </div>
    </div>
  );
};

export default Index;