export function Header() {
	return (
		<div className='flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700'>
			<h2
				style={{ color: '#ffffff' }}
				className='text-3xl md:text-5xl font-serif font-black tracking-tighter border-b-4 border-blue-600 pb-2 uppercase'
			>
				Tax Alert System
			</h2>
			<p
				style={{ color: 'rgba(255, 255, 255, 0.8)' }}
				className='mt-2 text-xs font-medium uppercase tracking-[0.4em]'
			>
				Secure Financial Monitoring
			</p>
		</div>
	);
}
