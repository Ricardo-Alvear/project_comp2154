import React from 'react';
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Header } from '../../components/header/Header';
import { Footer } from '../../components/footer/Footer';
import { Link } from 'react-router-dom';

export function Login() {
	return (
		<div className='grid grid-rows-[100px_1fr_100px] w-screen h-screen overflow-hidden bg-[#FDFDFD] font-sans'>
			<header className='bg-slate-800 flex items-center justify-center px-8 border-b border-slate-700'>
				<div className='flex items-center justify-center w-full max-w-[1200px] text-white'>
					<Header />
				</div>
			</header>

			<main className='bg-white flex items-center justify-center p-6'>
				<section className='w-full max-w-[420px] bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl'>
					<div className='flex flex-col items-center'>
						<div className='mb-6 p-4 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20'>
							<LockKeyhole size={32} />
						</div>

						<h1 className='text-3xl font-serif font-black tracking-tighter text-slate-900 uppercase mb-8 border-b-4 border-blue-600 pb-2 text-center'>
							System Access
						</h1>

						<div className='w-full space-y-4'>
							<div className='relative group'>
								<Mail
									className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors'
									size={18}
								/>
								<input
									className='w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm'
									type='email'
									placeholder='Email Address'
									required
								/>
							</div>

							<div className='relative group'>
								<LockKeyhole
									className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors'
									size={18}
								/>
								<input
									className='w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm'
									type='password'
									placeholder='Password'
									required
								/>
							</div>

							<button
								className='w-full mt-6 py-4 bg-blue-600 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300'
								type='submit'
							>
								Authorize & Enter
							</button>
						</div>

						<div className='mt-6 text-center'>
							<Link
								to='/register'
								className='text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors'
							>
								Need an account? Register here
							</Link>
						</div>

						<div className='mt-8 flex items-center gap-2 text-slate-400 uppercase tracking-widest text-[9px] font-bold bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm'>
							<ShieldCheck
								size={14}
								className='text-emerald-500'
							/>
							Encrypted Session Verified
						</div>
					</div>
				</section>
			</main>

			<footer className='bg-slate-900 flex items-center justify-center border-t border-slate-800'>
				<Footer />
			</footer>
		</div>
	);
}
