import { Link, useLocation } from "react-router-dom";

export function NavbarC() {
  const location = useLocation();
  const navLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "Progress", path: "/dashboard/file-tracking-progress" },
    { name: "Files", path: "/dashboard/tax-files" },
  ];

  return (
    <nav className="flex items-center justify-end">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            to={link.path}
            /* mx-4: Adds 1rem (16px) space on both sides of EVERY link
                           This creates a total of 32px between links.
                        */
            className={`mx-4 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all no-underline ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                : "bg-white text-slate-600 shadow-sm hover:text-blue-600"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
