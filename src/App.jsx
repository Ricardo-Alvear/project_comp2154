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
				{/* 1. Auth Routes (Stay outside the layout) */}
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />

				{/* 2. Layout Wrapper (The "Parent" Route) */}
				<Route path='/' element={<MainLayout />}>
					{/* Default path redirects to /home */}
					<Route index element={<Navigate to='/home' />} />

					{/* The Dashboard (Home) - MainLayout handles the "null" children case */}
					<Route path='home' element={null} />

					{/* These pages will now show INSIDE the MainLayout white area */}
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
			</Routes>
		</BrowserRouter>
	);
}

export default App;
