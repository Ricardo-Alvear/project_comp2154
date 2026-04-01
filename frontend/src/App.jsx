import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layouts/Mainlayout/MainLayout.jsx";
import { TaxFiles } from "./pages/tax-files/TaxFiles.jsx";
import { NotificationsPage } from "./pages/notifications/notificationsPage.jsx";
import { FileTrackingProgressPage } from "./pages/file-tracking-progress/FileTrackingProgressPage.jsx";
import { Login } from "./pages/login/Login.jsx";
import { Register } from "./pages/register/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Landing Logic: Redirect root to register */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* 2. Public Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 3. Protected Dashboard Routes 
                    MainLayout acts as the wrapper for all these sub-pages 
                */}
        <Route path="/dashboard" element={<MainLayout />}>
          {/* The 'index' route renders when the path is exactly /dashboard */}
          <Route index element={null} />
          <Route path="tax-files" element={<TaxFiles />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route
            path="file-tracking-progress"
            element={<FileTrackingProgressPage />}
          />
        </Route>

        {/* 4. Production Catch-all: 
                    If a user enters a broken URL, send them back to start.
                */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
