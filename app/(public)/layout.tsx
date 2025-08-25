import FooterPublic from "./components/FooterPublic";
import HeaderPublic from "./components/HeaderPublic";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderPublic />
      {children}
      <FooterPublic />
    </main>
  );
};
export default PublicLayout;
