import React from 'react';
import { Bell, Plus, RotateCcw, Calendar } from 'lucide-react';

export function NotificationsPage() {
	const notifications = [
		{
			id: 1,
			name: 'Quarterly Tax Filing Deadline',
			date: 'Jan 2, 2026',
			type: 'Urgent',
		},
		{
			id: 2,
			name: 'System Maintenance Update',
			date: 'Feb 15, 2026',
			type: 'System',
		},
	];

	return (
		/* Removed <MainLayout> wrapper */
		<div className='w-full animate-in fade-in slide-in-from-bottom-4 duration-700'>
			<div className='mb-10'>
				<h1 className='text-4xl font-serif font-black tracking-tighter text-slate-900 uppercase'>
					System Notifications
				</h1>
				<p className='text-slate-400 font-medium mt-1 tracking-wide uppercase text-xs'>
					Manage Alert Broadcasts & Reminders
				</p>
			</div>

			{/* INPUT COMMAND BAR */}
			<section className='bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center'>
				<div className='relative flex-grow w-full'>
					<Bell
						className='absolute left-4 top-1/2 -translate-y-1/2 text-blue-600'
						size={18}
					/>
					<input
						type='text'
						placeholder='Enter notification details...'
						className='w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-600 shadow-sm transition-all'
					/>
				</div>

				<div className='flex gap-3 w-full md:w-auto'>
					<button className='flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-md'>
						<Plus size={16} /> Add
					</button>
					<button className='flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-300 transition-colors'>
						<RotateCcw size={16} /> Reset
					</button>
				</div>
			</section>

			{/* LIST OF NOTIFICATIONS */}
			<div className='space-y-4'>
				{notifications.map((note) => (
					<div
						key={note.id}
						className='bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:border-blue-600 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4'
					>
						<div>
							<h4 className='font-black text-slate-800 uppercase tracking-tight'>
								{note.name}
							</h4>
							<div className='flex items-center gap-2 text-slate-400 mt-1'>
								<Calendar size={12} />
								<p className='text-[10px] font-bold uppercase tracking-widest'>
									Date: {note.date}
								</p>
							</div>
						</div>
						<div className='flex items-center gap-3'>
							<button className='px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors'>
								Update
							</button>
							<button className='px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors'>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
