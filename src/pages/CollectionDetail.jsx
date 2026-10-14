import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/client";
import { corDaColecao, iconeDaColecao } from "../constants/cores";
import PokemonRow from "../components/PokemonRow";
// import PokemonRow from "../components/PokemonRow";

export default function CollectionDetail() {
  const { id } = useParams();

  const [colecao, setColecao] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarTudo() {
      try {
        setCarregando(true);
        setErro(null);
        const [resColecao, resPokemons] = await Promise.all([
          api.get(`/colecoes/${id}`),
          api.get(`/colecoes/${id}/pokemons`),
        ]);
        setColecao(resColecao.data);
        setPokemons(resPokemons.data);
      } catch (e) {
        console.error(e);
        setErro("Não foi possível carregar essa coleção.");
      } finally {
        setCarregando(false);
      }
    }
    buscarTudo();
  }, [id]);

  const cores = corDaColecao(colecao?.cor);
  const icones = iconeDaColecao(colecao?.icone);

  return (
    <div className="p-8">
      <header className="mb-4 flex items-start justify-between gap-4">
        <div className="flex w-auto h-auto">
          <div
            className={`flex h-14 w-14 items-center justify-center text-2xl rounded-xl ${cores.borda} ${cores.card}`}
          >
            {icones}
          </div>
          <div>
            <h1 className="pl-4 font-display text-3xl font-extrabold text-ink">
              {colecao?.nome ?? "Carregando..."}
            </h1>
            <p className="pl-4 text-ink-soft">
              {pokemons.length} {pokemons.length === 1 ? "Pokémons" : "Pokémon"}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="shrink-0 px-6 py-3 bg-brand rounded-full font-semibold text-white hover:bg-brand-hover "
        >
          + adicionar pokémon
        </button>
      </header>
      <hr className="mb-4 border-none h-0.5 bg-stone-200" />
      {carregando && <p>Carregando...</p>}

      {erro && <div>{erro}</div>}

      {!carregando && !erro && pokemons === 0 && (
        <p className="text-ink-soft">
          Nenhum pokemon ainda. Adicione o Primeiro!
        </p>
      )}
      {!carregando && !erro && pokemons.length > 0 && (
        <div className="w-full overflow-hidden rounded-2xl border border-line bg-card shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wide text-ink-muted border-b border-b-line">
              <tr>
                <th className="px-6 py-4 text-left">
                  Nome
                </th>
                <th className="px-6 py-4 text-left">
                  Tipos
                </th>
                <th className="px-6 py-4 text-left">
                  CP
                </th>
                <th className="px-6 py-4 text-left">
                  IV
                </th>
                <th className="px-6 py-4 text-left">
                  Data Captura
                </th>
                <th className="px-6 py-4 text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {pokemons.map((pokemon) => (
                <PokemonRow
                  key={pokemon._id}
                  pokemon={pokemon}
                  onEdit={(c) => console.log("editar", c)}
                  onExcluir={(c) => console.log("excluir", c)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
