export function Footer() {
	return (
		<div className='flex flex-col items-center gap-2'>
			<p
				style={{ color: '#ffffff' }}
				className='text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold'
			>
				&copy; 2026 Ricardo Alvear
			</p>
			<div className='h-px w-12 bg-white/20' />
			<p
				style={{ color: 'rgba(255, 255, 255, 0.6)' }}
				className='text-[9px] uppercase tracking-widest'
			>
				Proprietary Tax Management Interface
			</p>
		</div>
	);
}
