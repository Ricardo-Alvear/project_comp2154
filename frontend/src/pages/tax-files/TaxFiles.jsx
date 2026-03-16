import React from 'react';
import { FileDown, ShieldCheck, FolderArchive, Search } from 'lucide-react';

export function TaxFiles() {
	const taxDocuments = [
		{
			year: '2025',
			type: 'Annual Return',
			status: 'Verified',
			id: 'TX-2025-001',
		},
		{
			year: '2024',
			type: 'Annual Return',
			status: 'Archived',
			id: 'TX-2024-004',
		},
		{
			year: '2025',
			type: 'Quarterly Est.',
			status: 'Verified',
			id: 'TX-2025-Q1',
		},
	];

	return (
		/* Notice: No <MainLayout> wrapper here! 
           The wrapper is already handled by App.jsx and <Outlet /> */
		<div className='w-full animate-in fade-in slide-in-from-bottom-4 duration-700'>
			{/* Page Header Area */}
			<div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-8'>
				<div>
					<h1 className='text-4xl font-serif font-black tracking-tighter text-slate-900 uppercase'>
						Secure Tax Vault
					</h1>
					<p className='text-slate-400 font-medium mt-1 tracking-wide uppercase text-xs'>
						Access and download your verified financial records
					</p>
				</div>

				<div className='flex gap-2'>
					<div className='relative'>
						<Search
							className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'
							size={16}
						/>
						<input
							type='text'
							placeholder='Search records...'
							className='pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-600 w-64'
						/>
					</div>
				</div>
			</div>

			{/* Document Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{taxDocuments.map((doc, i) => (
					<div
						key={i}
						className='group relative bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:border-blue-600 transition-all duration-300'
					>
						<div className='flex justify-between items-start mb-6'>
							<div className='p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300'>
								<FolderArchive size={28} strokeWidth={1.5} />
							</div>
							<span className='text-2xl font-serif font-black text-slate-200 group-hover:text-blue-100 transition-colors'>
								{doc.year}
							</span>
						</div>

						<div className='mb-8'>
							<h4 className='text-lg font-black text-slate-800 uppercase tracking-tight'>
								{doc.type}
							</h4>
							<p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1'>
								Ref: {doc.id}
							</p>
						</div>

						<div className='flex items-center justify-between pt-6 border-t border-slate-50'>
							<div className='flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500'>
								<ShieldCheck size={14} /> {doc.status}
							</div>
							<button className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md hover:bg-blue-700 transition-all'>
								<FileDown size={16} /> Download
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
