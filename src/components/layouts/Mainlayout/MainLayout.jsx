import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom'; // Added Outlet and useLocation
import { FileText, LayoutGrid, Bell } from 'lucide-react';
import { Header } from '../../header/Header.jsx';
import { NavbarC } from '../../navigation/Navbar.jsx';
import { Footer } from '../../footer/Footer.jsx';

export function MainLayout() {
	const navigate = useNavigate();
	const location = useLocation();

	// Check if we are exactly on the home page to show the boxes
	const isHome = location.pathname === '/home';

	return (
		<div className='grid grid-rows-[120px_1fr_100px] w-screen h-screen overflow-hidden bg-[#FDFDFD] font-sans'>
			{/* 1. HEADER */}
			<header className='bg-[#1a2233] flex items-center justify-center px-8 border-b border-slate-700 shadow-lg z-10'>
				<div className='flex items-center justify-between w-full max-w-[1400px]'>
					<div className='w-[100px] hidden md:block' />
					<div className='flex-1 text-white'>
						<Header />
					</div>
					<div className='w-auto min-w-[300px] flex justify-end'>
						<NavbarC />
					</div>
				</div>
			</header>

			{/* 2. MAIN CONTENT AREA */}
			<main className='bg-white flex items-center justify-center p-12 overflow-y-auto'>
				<div className='w-full max-w-[1400px] h-full flex items-center justify-center'>
					{/* IF NOT HOME: Render the sub-page (TaxFiles, etc.) */}
					{!isHome ?
						<div className='w-full h-full animate-in fade-in duration-500'>
							<Outlet />
						</div>
					:	/* IF HOME: Render the 3 Dashboard Boxes side-by-side */
						<div className='flex flex-row items-center justify-center gap-20 w-full animate-in zoom-in-95 duration-700'>
							{/* Card 1 */}
							<div className='group flex-shrink-0 flex flex-col items-center justify-center w-[320px] h-[380px] bg-[#f8fafc] rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:bg-white'>
								<FileText
									size={110}
									className='mb-12 text-[#3b82f6]'
									strokeWidth={1.2}
								/>
								<button
									onClick={() => navigate('/tax-files')}
									className='px-10 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:bg-blue-600 hover:text-white transition-all'
								>
									Access Tax Files
								</button>
							</div>

							{/* Card 2 */}
							<div className='group flex-shrink-0 flex flex-col items-center justify-center w-[320px] h-[380px] bg-[#f8fafc] rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:bg-white'>
								<LayoutGrid
									size={110}
									className='mb-12 text-[#3b82f6]'
									strokeWidth={1.2}
								/>
								<button
									onClick={() =>
										navigate('/file-tracking-progress')
									}
									className='px-10 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-black text-xs uppercase tracking-tight shadow-sm hover:bg-blue-600 hover:text-white transition-all'
								>
									View File Progress
								</button>
							</div>

							{/* Card 3 */}
							<div className='group flex-shrink-0 flex flex-col items-center justify-center w-[320px] h-[380px] bg-[#f8fafc] rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:bg-white'>
								<div className='relative mb-12 text-[#3b82f6]'>
									<Bell size={110} strokeWidth={1.2} />
									<span className='absolute top-2 right-2 w-6 h-6 bg-[#ef4444] rounded-full border-4 border-[#f8fafc]' />
								</div>
								<button
									onClick={() => navigate('/notifications')}
									className='px-10 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-black text-xs uppercase tracking-tight shadow-sm hover:bg-blue-600 hover:text-white transition-all'
								>
									Alerts
								</button>
							</div>
						</div>
					}
				</div>
			</main>

			{/* 3. FOOTER */}
			<footer className='bg-[#0f172a] flex items-center justify-center border-t border-slate-800 shadow-lg'>
				<Footer />
			</footer>
		</div>
	);
}
