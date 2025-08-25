import NextImage from "@/components/NextImage";
import CurrentDate from "./CurrentDate";
import NavigationHeader from "./NavigationHeader";

const HeaderPublic = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <NextImage
              imagePath="/logo_gestion.png"
              altText="Logo Mesa de Partes Virtual"
              width={100}
              height={100}
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">Mesa de Partes Virtual</h1>
              <CurrentDate />
            </div>
          </div>

          <NavigationHeader />
        </div>

        {/* <div className="sm:hidden mt-3 text-center">
          <h1 className="text-lg font-bold">Mesa de Partes Virtual</h1>
          <CurrentDate />
        </div> */}
      </div>
    </header>
  );
};
export default HeaderPublic;
