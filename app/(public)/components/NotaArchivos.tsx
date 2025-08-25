import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileCheck, Upload } from "lucide-react";

const NotaArchivos = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileCheck className="h-5 w-5 mr-2 text-blue-600" />
            Información Importante sobre Archivos
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="h-4 w-4 mr-2 text-green-600" />
                Formatos Aceptados
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  PDF (.pdf) - Recomendado
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Word (.doc, .docx)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Imágenes (.jpg, .png)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Excel (.xls, .xlsx)
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h4 className="font-semibold text-gray-900 mb-4">
                Requisitos de Archivos
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tamaño máximo: 10 MB por archivo</li>
                <li>• Máximo 5 archivos por envío</li>
                <li>• Documentos legibles y completos</li>
                <li>• Sin contraseñas o protección</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Importante:</strong> Asegúrese de que todos los
                documentos estén completos y sean legibles antes de enviarlos.
                Los documentos incompletos pueden retrasar el procesamiento.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotaArchivos;
