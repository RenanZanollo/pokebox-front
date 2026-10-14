import { useEffect, useState } from "react";
import Modal from "./Modal";
import api from "../api/client";
import { ICONES_COLECAO, CORES_COLECAO } from "../constants/cores";

const VAZIO = { nome: "", icone: "raio", cor: "azul", descricao: "" };

export default function CollectionFormModal({ aberto, onFechar, colecao, onSalvo }) {
    const [form, setForm] = useState(VAZIO);
    const [erros, setErros] = useState([]);
    const [salvando, setSalvando] = useState(false);

    const editando = Boolean(colecao);

    // Quando abre: preenche (edição) ou limpa (criação)
    useEffect(() => {
        if (!aberto) return;
            setErros([]);
        setForm(
            colecao
                ? {
                    nome: colecao.nome,
                    icone: colecao.icone,
                    cor: colecao.cor,
                    descricao: colecao.descricao ?? "",
                }
                : VAZIO
        );
    }, [aberto, colecao]);

    function mudar(campo, valor) {
        setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    async function enviar(evento) {
        evento.preventDefault();
        setErros([]);
        setSalvando(true);

        try {
            if (editando) {
                await api.put(`/colecoes/${colecao._id}`, form);
            } else {
                await api.post("/colecoes", form);
            }
            onSalvo();
            onFechar();
        } catch (e) {
            const dados = e.response?.data;
            setErros(dados?.detalhes ?? [dados?.erro ?? "Não foi possível salvar."]);
        } finally {
            setSalvando(false);
        }
    }

    return (
        <Modal
            aberto={aberto}
            onFechar={onFechar}
            titulo={editando ? "Editar Coleção" : "Nova Coleção"}
        >
            <form onSubmit={enviar} className="p-6">

                {erros.length > 0 && (
                    <ul className="mb-4 space-y-1 rounded-xl bg-danger-soft p-3 text-sm text-danger">
                        {erros.map((mensagem) => (
                            <li key={mensagem}>{mensagem}</li>
                        ))}
                    </ul>
                )}

                {/* NOME */}
                <label htmlFor="nome" className="block text-sm font-semibold text-ink">
                    Nome <span className="text-danger">*</span>
                </label>
                <input
                    id="nome"
                    value={form.nome}
                    onChange={(e) => mudar("nome", e.target.value)}
                    maxLength={30}
                    placeholder="ex: Quero Evoluir"
                    className="mt-1 w-full rounded-xl border border-line px-4 py-2.5 outline-none focus:border-brand"
                />
                <p className="mt-1 text-right text-xs text-ink-muted">{form.nome.length}/30</p>

                {/* ÍCONE */}
                <fieldset className="mt-4">
                    <legend className="text-sm font-semibold text-ink">Ícone</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(ICONES_COLECAO).map(([chave, emoji]) => (
                            <button
                                key={chave}
                                type="button"
                                onClick={() => mudar("icone", chave)}
                                aria-label={chave}
                                aria-pressed={form.icone === chave}
                                className={`h-11 w-11 rounded-xl border text-xl ${form.icone === chave ? "border-brand bg-brand-soft" : "border-line"
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </fieldset>

                {/* COR */}
                <fieldset className="mt-4">
                    <legend className="text-sm font-semibold text-ink">Cor</legend>
                    <div className="mt-2 flex flex-wrap gap-3">
                        {Object.entries(CORES_COLECAO).map(([chave, cores]) => (
                            <button
                                key={chave}
                                type="button"
                                onClick={() => mudar("cor", chave)}
                                aria-label={chave}
                                aria-pressed={form.cor === chave}
                                className={`h-8 w-8 rounded-full ${cores.swatch} ${form.cor === chave ? "ring-2 ring-ink ring-offset-2" : ""
                                    }`}
                            />
                        ))}
                    </div>
                </fieldset>

                {/* DESCRIÇÃO */}
                <label htmlFor="descricao" className="mt-4 block text-sm font-semibold text-ink">
                    Descrição <span className="font-normal text-ink-muted">(opcional)</span>
                </label>
                <textarea
                    id="descricao"
                    rows={3}
                    value={form.descricao}
                    onChange={(e) => mudar("descricao", e.target.value)}
                    maxLength={120}
                    placeholder="Pra que serve essa coleção?"
                    className="mt-1 w-full resize-none rounded-xl border border-line px-4 py-2.5 outline-none focus:border-brand"
                />

                {/* AÇÕES */}
                <div className="mt-6 flex justify-end gap-3 border-t border-line pt-4">
                    <button
                        type="button"
                        onClick={onFechar}
                        className="rounded-full border border-line px-5 py-2.5 font-semibold text-ink-soft hover:bg-surface"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={salvando}
                        className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-hover disabled:opacity-50"
                    >
                        {salvando ? "Salvando…" : editando ? "Salvar" : "Criar Coleção"}
                    </button>
                </div>

            </form>
        </Modal>
    );
}