import { ModeToggle } from "@/components/theme/ModeToggle";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <h1>Public</h1>
        <ModeToggle />
      </header>
      {children}
    </div>
  );
};
export default PublicLayout;
