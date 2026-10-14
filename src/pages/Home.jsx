import api from "../api/client";
import { useEffect, useState } from "react";
import CollectionCard from "../components/CollectionCard";

export default function Home() {

  const [colecoes, setColecoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarColecoes() {
      try {
        setCarregando(true);
        setErro(null);
        const resposta = await api.get("/colecoes")
        setColecoes(resposta.data);
      } catch (e) {
        console.error(e);
        setErro("Não foi possível carregar as coleções.")
      } finally {
        setCarregando(false)
      }
    }
    buscarColecoes();
  }, []);

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Minhas Coleções
        </h1>
        <p className="text-ink-soft">
          Organize seus Pokémon do jeito que fizer sentido pra você
        </p>
      </header>
      {carregando && <p className="text-ink-muted">Carregando...</p>}

      {erro && (
        <div className="rounded-card bg-danger-soft p-4 text-danger">{erro}</div>
      )}
      {!carregando && !erro && colecoes.length === 0 && (
        <p className="text-ink-muted">Nenhuma coleção ainda, crie a primeira!</p>
      )}
      {!carregando && !erro && colecoes.length > 0 && (
        // conforme a largura da tela, vão criando mais colunas
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {colecoes.map((colecao) => (
            <li key={colecao._id}>
              <CollectionCard colecao={colecao} onEdit={(c) => console.log("editar", c)} onExcluir={(c) => console.log("excluir", c)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}