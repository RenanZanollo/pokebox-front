import { Link } from "react-router"
import { corDaColecao, iconeDaColecao } from "../constants/cores"

export default function CollectionCard({ colecao, onEdit, onExcluir }){
    const cores = corDaColecao(colecao.cor);

    return (
        <article className={`group rounded-card p-6 shadow-card ${cores.card}`}>
            <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-card text-2xl" aria-hidden="true">
                    {iconeDaColecao(colecao.icone)}
                </span>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                        type="button"
                        onClick={() => onEdit(colecao)}
                        aria-label={`Editar ${colecao.nome}`}
                        className="rounded-lg p-2 text-ink-muted hover:bg-card hover:text-ink">
                        ✏️
                    </button>
                    <button
                        type="button"
                        onClick={() => onExcluir(colecao)}
                        aria-label={`Excluir ${colecao.nome}`}
                        className="rounded-lg p-2 text-ink-muted hover:bg-card hover:text-danger">
                        🗑️
                    </button>
                </div>
            </div>
            <div className="flex mt-8 items-end justify-between">
                <div>
                    {colecao.descricao && (
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${cores.badge}`}>
                            {colecao.descricao}
                        </span>
                    )}
                    <h2 className="mt-1 font-display text-xl font-bold text-ink">
                        <Link to={`/colecoes/${colecao._id}`} className="hover:underline">
                            {colecao.nome}
                        </Link>
                    </h2>
                </div>
                <p className="text-right leading-tight">
                    <span className={`block text-3xl font-extrabold ${cores.numero}`}>
                        {colecao.totalPokemons}
                    </span>
                    <span className="text-xs text-ink-muted">{colecao.totalPokemons.length === 1 ? "Pokémon" : "Pokémons"}</span>
                </p>
            </div>
        </article >
    );
}