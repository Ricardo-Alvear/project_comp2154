import React from 'react';
import {
	CheckCircle2,
	FileText,
	Database,
	HardDrive,
	Clock,
	Download,
} from 'lucide-react';

export function FileTrackingProgressPage() {
	const files = [
		{
			name: 'Income_Statement_2026.pdf',
			date: 'Mar 08',
			status: 'Ready',
			size: '1.2MB',
		},
		{
			name: 'T4_Slip_Summary.pdf',
			date: 'Mar 05',
			status: 'Ready',
			size: '0.8MB',
		},
		{
			name: 'Business_Expenses.xlsx',
			date: 'Mar 01',
			status: 'Ready',
			size: '4.5MB',
		},
	];

	return (
		/* The wrapper is now handled by the Parent Route in App.jsx */
		<div className='w-full animate-in fade-in slide-in-from-bottom-4 duration-700'>
			<div className='mb-10'>
				<h1 className='text-4xl font-serif font-black tracking-tighter text-slate-900 uppercase'>
					File Tracking Progress
				</h1>
				<p className='text-slate-400 font-medium mt-1 tracking-wide uppercase text-xs'>
					System Records & Download History
				</p>
			</div>

			{/* DASHBOARD STATS */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
				<div className='bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-5'>
					<div className='p-4 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20'>
						<Database size={24} />
					</div>
					<div>
						<p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>
							Total Files
						</p>
						<p className='text-2xl font-serif font-black text-slate-900'>
							{files.length}
						</p>
					</div>
				</div>

				<div className='bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-5'>
					<div className='p-4 bg-slate-800 text-white rounded-xl'>
						<HardDrive size={24} />
					</div>
					<div>
						<p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>
							Storage Used
						</p>
						<p className='text-2xl font-serif font-black text-slate-900'>
							6.5 MB
						</p>
					</div>
				</div>

				<div className='bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-5'>
					<div className='p-4 bg-emerald-500 text-white rounded-xl'>
						<Clock size={24} />
					</div>
					<div>
						<p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>
							Last Synced
						</p>
						<p className='text-2xl font-serif font-black text-slate-900'>
							Today
						</p>
					</div>
				</div>
			</div>

			{/* ACTIVITY LIST */}
			<div className='space-y-4'>
				<h3 className='text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-6'>
					Recent Activity
				</h3>
				{files.map((file, i) => (
					<div
						key={i}
						className='flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-600 transition-all shadow-sm group'
					>
						<div className='flex items-center gap-5'>
							<div className='p-3 bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-xl transition-colors'>
								<FileText size={24} />
							</div>
							<div>
								<p className='font-black text-slate-800 uppercase tracking-tight leading-none mb-1'>
									{file.name}
								</p>
								<p className='text-[10px] text-slate-400 font-bold uppercase tracking-widest'>
									{file.date} • {file.size}
								</p>
							</div>
						</div>
						<div className='flex items-center gap-8'>
							<span className='flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500'>
								<CheckCircle2 size={14} /> {file.status}
							</span>
							<button className='text-slate-300 hover:text-blue-600 transition-all'>
								<Download size={22} />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
