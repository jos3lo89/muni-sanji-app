import { Clock, Send, Shield } from "lucide-react";

const SendDocumentsTitle = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Envío de Documentos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete el formulario para enviar sus documentos de manera segura y
            eficiente
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-blue-50">
            <Send className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Envío Rápido</h3>
            <p className="text-sm text-gray-600">
              Proceso simplificado para enviar documentos en minutos
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-green-50">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">
              Seguimiento 24/7
            </h3>
            <p className="text-sm text-gray-600">
              Consulte el estado de sus documentos en cualquier momento
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-purple-50">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Seguro</h3>
            <p className="text-sm text-gray-600">
              Sus documentos están protegidos con la máxima seguridad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendDocumentsTitle;
