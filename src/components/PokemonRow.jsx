import TypeBadge from "./TypeBadge.jsx";

export default function PokemonRow({ pokemon, onExcluir, onEditar }) {

  const dataFormatada = pokemon.dataCaptura
    ? new Date(pokemon.dataCaptura).toLocaleDateString("pt-BR")
    : "—";

  return (
    <tr className="border-b border-line last:border-0 hover:bg-surface">
      <td className="px-6 py-4">
        <div className="flex">
          <h1 className="font-semibold text-ink ">{pokemon.apelido}</h1>
          {pokemon.shiny && <span>✨</span>}
        </div>
        <p className="text-xs text-ink-soft">
          {pokemon.especieNome} #{pokemon.especieId}
        </p>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {pokemon.tipos?.map((tipo) => (
            <TypeBadge key={tipo} tipo={tipo} />
          ))}
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-ink">{pokemon.cp}</td>

      {/* logica do IV */}
      <td className="px-6 py-4">{pokemon.ivPorcentagem}%</td>

      <td className="px-6 py-4 text-ink-soft">{dataFormatada}</td>
      <td className="px-6 py-4">
        <div className="flex justify-end gap-1">
        <button
          type="button"
          className="rounded-lg p-2 text-ink-muted hover:bg-card hover:text-ink"
        >
          ✏️
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-ink-muted hover:bg-card hover:text-danger"
        >
          🗑️
        </button>
        </div>
      </td>
    </tr>
  );
}
