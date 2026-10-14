import { useState } from "react";
import { NavLink, Outlet } from "react-router";

export default function AppLayout() {
  const [aberta, setAberta] = useState(true);

  return (
    <div className="flex min-h-screen">
      <aside
        className={`flex flex-col border-r border-line bg-card transition-all 
        duration-200 ${aberta ? "w-64" : "w-20"}`}
      >
        <header className="flex items-center justify-between p-5">
          {aberta && (
            <span className="flex items-center gap-2 font-display text-xl font-extrabold text-brand">
              <span className="h-5 w-1 rounded-full bg-brand" />
              PokéBox
            </span>
          )}
          <button
            type="button"
            onClick={() => setAberta(!aberta)}
            aria-label={aberta ? "Recolher menu" : "Expandir menu"}
            className="rounded-lg p-2 text-ink-muted hover:bg-surface hover:text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`h-4 w-4 transition-transform ${aberta ? "" : "rotate-180"}`}
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-soft text-brand"
                      : "text-ink-soft hover:bg-surface"
                  }`
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5 shrink-0"
                >
                  <path
                    d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {aberta && <span>Todas as Coleções</span>}
              </NavLink>
            </li>
            {/* adicionar collections aqui, ver como fazer essa logica */}
          </ul>
        </nav>
        <footer className="border-t border-line p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display font-bold text-brand">
              R
            </span>
            {aberta && (
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-ink">Renan</span>
                <span className="text-xs text-ink-muted">Treinador</span>
              </span>
            )}
          </div>
        </footer>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
