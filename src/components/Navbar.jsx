import React, { useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import RootdLogo from '../assets/branding/rootd-logo.png';

const NAV_LINKS = [
	{ label: 'Dashboard', to: '/dashboard' },
	{ label: 'Matches', to: '/matches' },
	{ label: 'Deals', to: '/deals' },
	{ label: 'Compliance', to: '/compliance' },
	{ label: 'Profile', to: '/profile' }
];

export default function Navbar() {
	const { user, signOut, persona } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const userInitials = useMemo(() => {
		if (!user?.email) return 'U';
		if (user.user_metadata?.full_name) {
			const parts = user.user_metadata.full_name.split(' ');
			return parts
				.slice(0, 2)
				.map((name) => name.charAt(0).toUpperCase())
				.join('');
		}
		return user.email.charAt(0).toUpperCase();
	}, [user]);

	const handleSignOut = async () => {
		await signOut();
		navigate('/signin', { replace: true });
	};

	const linkClass = ({ isActive }) =>
		`text-base font-semibold tracking-wide transition-colors ${isActive ? 'text-rootd-pine' : 'text-slate-500 hover:text-rootd-pine'}`;

	const renderLinks = () => (
		<nav className="flex flex-col gap-3 sm:flex-row sm:items-center">
			{NAV_LINKS.map((link) => (
				<NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setIsMobileOpen(false)}>
					{link.label}
				</NavLink>
			))}
		</nav>
	);

	return (
		<header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-4 sm:px-10 lg:px-12">
				<button
					type="button"
					className="flex items-center gap-2 text-left"
					onClick={() => navigate('/dashboard')}
				>
					<img src={RootdLogo} alt="Rootd" className="h-15 w-auto" />
					<div>
						<p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rootd</p>
						<p className="font-display text-lg font-semibold text-slate-900">NIL OS</p>
					</div>
				</button>

				<div className="hidden flex-1 justify-center sm:flex">{renderLinks()}</div>

				<div className="flex items-center gap-3">
					<button
						type="button"
						className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 sm:hidden"
						onClick={() => setIsMobileOpen((prev) => !prev)}
						aria-label="Toggle navigation menu"
					>
						<span className="sr-only">Open menu</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-5 w-5"
						>
							{isMobileOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5M3.75 15h16.5" />
							)}
						</svg>
					</button>

					<div className="relative">
						<button
							type="button"
							className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 pl-1 text-sm font-semibold text-slate-600"
							onClick={() => setIsMenuOpen((prev) => !prev)}
						>
							<span className="flex h-9 w-9 items-center justify-center rounded-full bg-rootd-pine text-white">{userInitials}</span>
							<span className="hidden text-left sm:block">
								<span className="block text-xs uppercase tracking-wide text-slate-400">{persona}</span>
								<span>{user?.email ?? 'User'}</span>
							</span>
						</button>

						{isMenuOpen && (
							<div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-100 bg-white p-2 text-sm shadow-2xl">
								<NavLink
									to="/profile"
									className={({ isActive }) =>
										`block rounded-xl px-3 py-2 font-medium ${
											isActive || location.pathname === '/profile'
												? 'bg-rootd-cream text-rootd-pine'
												: 'text-slate-600 hover:bg-slate-50'
										}`
									}
									onClick={() => setIsMenuOpen(false)}
								>
									Profile
								</NavLink>
												<button
													type="button"
													className="block w-full rounded-xl px-3 py-2 text-left font-medium text-slate-600 hover:bg-slate-50"
													onClick={() => {
														setIsMenuOpen(false);
														navigate('/profile?panel=settings');
													}}
												>
									Settings
								</button>
								<button
									type="button"
									className="block w-full rounded-xl px-3 py-2 text-left font-semibold text-rose-600 hover:bg-rose-50"
									onClick={handleSignOut}
								>
									Sign out
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{isMobileOpen && <div className="border-t border-slate-200 bg-white px-4 py-4 sm:hidden">{renderLinks()}</div>}
		</header>
	);
}
