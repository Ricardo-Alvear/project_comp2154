import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FileDown, ShieldCheck, FolderArchive, Search } from 'lucide-react';

export function TaxFiles() {
	const [taxDocuments, setTaxDocuments] = useState([]);

	// Fetch the real records from MongoDB on load
	useEffect(() => {
		const fetchRecords = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5001/api/v1/tax-records',
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					},
				);
				setTaxDocuments(response.data); // Set the actual DB records
			} catch (err) {
				console.error('Failed to fetch records', err);
			}
		};
		fetchRecords();
	}, []);

	// inside TaxFiles.jsx
	const handleDownload = async (id, type, year) => {
		try {
			const token = localStorage.getItem('token');

			// Debugging: Check if token exists in console
			console.log('Attempting download with token:', token);

			if (!token) {
				alert('Session expired. Please log in again.');
				return;
			}

			const response = await axios({
				url: `http://localhost:5001/api/v1/tax-records/download/${id}`,
				method: 'GET',
				responseType: 'blob',
				headers: {
					// Ensure this matches exactly what your auth.js middleware expects
					Authorization: `Bearer ${token}`,
				},
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute(
				'download',
				`${type.replace(/\s+/g, '_')}_${year}.pdf`,
			);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error('Download failed:', error);
			// If the error is 401 or 403, it means the token was rejected by auth.js
			alert(
				'Access Denied: Please log in to download financial records.',
			);
		}
	};

	return (
		<div className='w-full animate-in fade-in slide-in-from-bottom-4 duration-700'>
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
							<button
								onClick={() =>
									handleDownload(doc.id, doc.type, doc.year)
								}
								className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md hover:bg-blue-700 transition-all'
							>
								<FileDown size={16} /> Download
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
