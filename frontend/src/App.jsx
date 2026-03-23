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
				{/* Landing Logic: only redirect to register if the path is EXACTLY '/' */}
				<Route path='/' element={<Navigate to='/register' replace />} />

				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />

				{/* Dashboard Routes */}
				<Route path='/dashboard' element={<MainLayout />}>
					{/* When at /dashboard, show the home view */}
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

				{/* Catch-all: ONLY redirect if the URL matches nothing else */}
				<Route path='*' element={<Navigate to='/register' replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
