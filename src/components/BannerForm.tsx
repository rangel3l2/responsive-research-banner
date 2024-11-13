import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

interface FormData {
  title: string;
  introduction: string;
  objectives: string;
  methods: string;
  expectedResults: string;
  bibliography: string;
  images: File[];
}

const BannerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    introduction: '',
    objectives: '',
    methods: '',
    expectedResults: '',
    bibliography: '',
    images: [],
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 2) {
      toast.error("Maximum of 2 images allowed");
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

    // Create URLs for preview
    const newUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  const downloadAsPDF = async () => {
    if (!formRef.current) return;

    try {
      const canvas = await html2canvas(formRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('scientific-banner.pdf');
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Error generating PDF");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-6 space-y-8" ref={formRef}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter your research title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="introduction">Introduction (max 5 lines)</Label>
            <Textarea
              id="introduction"
              name="introduction"
              placeholder="Write your introduction here (max 5 lines)"
              value={formData.introduction}
              onChange={handleInputChange}
              className="mt-1 h-32"
              maxLength={500}
            />
          </div>

          <div>
            <Label htmlFor="objectives">Objectives (max 5 lines)</Label>
            <Textarea
              id="objectives"
              name="objectives"
              placeholder="Outline your objectives here (max 5 lines)"
              value={formData.objectives}
              onChange={handleInputChange}
              className="mt-1 h-32"
              maxLength={500}
            />
          </div>

          <div>
            <Label htmlFor="methods">Materials and Methods (max 10 lines)</Label>
            <Textarea
              id="methods"
              name="methods"
              placeholder="Describe your materials and methods here (max 10 lines)"
              value={formData.methods}
              onChange={handleInputChange}
              className="mt-1 h-48"
              maxLength={1000}
            />
          </div>

          <div>
            <Label>Images (max 2)</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1"
              disabled={formData.images.length >= 2}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-md"
                />
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="expectedResults">Expected Results</Label>
            <Textarea
              id="expectedResults"
              name="expectedResults"
              placeholder="Describe the expected results of your research"
              value={formData.expectedResults}
              onChange={handleInputChange}
              className="mt-1 h-32"
            />
          </div>

          <div>
            <Label htmlFor="bibliography">Bibliographic References</Label>
            <Textarea
              id="bibliography"
              name="bibliography"
              placeholder="List your references here"
              value={formData.bibliography}
              onChange={handleInputChange}
              className="mt-1 h-32"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={downloadAsPDF}>
            Download PDF
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BannerForm;