import DocumentSubmissionForm from "./components/DocumentSubmissionForm";
import HeaderTitle from "./components/HeaderTitle";
import NotaArchivos from "./components/NotaArchivos";
import SendDocumentsTitle from "./components/SendDocumentsTitle";

export default function Home() {
  return (
    <>
      <HeaderTitle />
      <SendDocumentsTitle />
      <DocumentSubmissionForm />
      <NotaArchivos />
    </>
  );
}
