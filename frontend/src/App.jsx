import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layouts/Mainlayout/MainLayout.jsx';
import { TaxFiles } from './pages/tax-files/TaxFiles.jsx';
import { NotificationsPage } from './pages/notifications/notificationsPage.jsx';
import { FileTrackingProgressPage } from './pages/file-tracking-progress/FileTrackingProgressPage.jsx';
import { Login } from './pages/login/Login.jsx';
import { Register } from './pages/register/Register.jsx';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Entry Point redirects to Register */}
				<Route path='/' element={<Navigate to='/register' />} />

				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />

				{/* Dashboard Parent Route */}
				<Route path='/dashboard' element={<MainLayout />}>
					{/* The index route represents the "Home" view with 3 boxes */}
					<Route index element={null} />
					<Route path='tax-files' element={<TaxFiles />} />
					<Route
						path='notifications'
						element={<NotificationsPage />}
					/>
					<Route
						path='file-tracking-progress'
						element={<FileTrackingProgressPage />}
					/>
				</Route>

				{/* Catch-all redirect */}
				<Route path='*' element={<Navigate to='/register' />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
