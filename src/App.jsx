import { Routes, Route } from "react-router-dom";
import { HomePage } from "../src/pages/home/homepage";
import { FileTrackingProgress } from "./pages/file-tracking-progress/FileTrackingProgressPage";
import { RegisterAndLogin } from "./pages/register-login/RegisterAndLogin";
import { TaxFiles } from "./pages/tax-files/TaxFiles";
import { MainLayout } from "./components/layouts/Mainlayout/MainLayout";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="file-tracking-progress" element={<FileTrackingProgress />} />
        <Route path="tax-files" element={<TaxFiles />} />
      </Routes>
          <MainLayout />
          <RegisterAndLogin />
    </>
  );
}

export default App;
