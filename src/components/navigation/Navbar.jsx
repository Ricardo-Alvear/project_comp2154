import { Link, useLocation } from 'react-router-dom';

export function NavbarC() {
	const location = useLocation();
	const navLinks = [
		{ name: 'Home', path: '/home' },
		{ name: 'Progress', path: '/file-tracking-progress' },
		{ name: 'Files', path: '/tax-files' },
	];

	return (
		<nav className='flex gap-4'>
			{navLinks.map((link) => (
				<Link
					key={link.path}
					to={link.path}
					className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
						location.pathname === link.path ?
							'bg-blue-600 text-slate-900'
						:	'text-slate-400 hover:text-white'
					}`}
				>
					{link.name}
				</Link>
			))}
		</nav>
	);
}
