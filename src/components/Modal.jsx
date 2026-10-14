import { useEffect, useRef } from "react";

export default function Modal({ aberto, onFechar, titulo, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (aberto && !dialog.open) dialog.showModal();
    if (!aberto && dialog.open) dialog.close();
  }, [aberto]);


  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const aoFechar = () => onFechar();
    dialog.addEventListener("close", aoFechar);
    return () => dialog.removeEventListener("close", aoFechar);
  }, [onFechar]);

  function aoClicar(evento) {
    if (evento.target === dialogRef.current) onFechar();
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={aoClicar}
      className="m-auto w-full max-w-lg rounded-modal bg-card shadow-xl backdrop:bg-black/40"
    >
      {aberto && (
        <div>
          <header className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="font-display text-xl font-bold text-ink">{titulo}</h2>
            <button
              type="button"
              onClick={onFechar}
              aria-label="Fechar"
              className="rounded-lg p-2 text-ink-muted hover:bg-surface hover:text-ink"
            >
              ✕
            </button>
          </header>

          {children}
        </div>
      )}
    </dialog>
  );
}