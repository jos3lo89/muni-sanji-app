import { FileText } from "lucide-react";

const HeaderTitle = () => {
  return (
    <div className="text-center py-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <FileText className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Mesa de Partes Virtual
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sistema digital para la presentación y seguimiento de documentos
          oficiales
        </p>
      </div>
    </div>
  );
};
export default HeaderTitle;
