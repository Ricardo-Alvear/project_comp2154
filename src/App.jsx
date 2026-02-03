import { Routes, Route } from "react-router-dom";
// Match the function names exactly as exported
import { HomePage } from "../src/pages/home/homepage";
import { FileTrackingProgress } from "./pages/file-tracking-progress/FileTrackingProgressPage";
import { RegisterAndLogin } from "./pages/register-login/RegisterAndLogin";
import { TaxFiles } from "./pages/tax-files/TaxFiles";
import { MainLayout } from "./components/layouts/Mainlayout/MainLayout";
import "./App.css";

function App() {
  return (
    // <Routes>
    //   <Route index element={<HomePage />} />
    //   <Route path="file-tracking-progress" element={<FileTrackingProgress />} />
    //   <Route path="register-login" element={<RegisterAndLogin />} />
    //   <Route path="tax-files" element={<TaxFiles />} />
    // </Routes>
    <MainLayout />
  );
}

export default App;
