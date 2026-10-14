const CORES_TIPO = {
  normal: "bg-stone-100 text-stone-700",
  fogo: "bg-orange-100 text-orange-700",
  agua: "bg-blue-100 text-blue-700",
  planta: "bg-green-100 text-green-700",
  eletrico: "bg-yellow-100 text-yellow-700",
  gelo: "bg-cyan-100 text-cyan-700",
  lutador: "bg-red-100 text-red-700",
  venenoso: "bg-purple-100 text-purple-700",
  terrestre: "bg-amber-100 text-amber-800",
  voador: "bg-indigo-100 text-indigo-700",
  psiquico: "bg-pink-100 text-pink-700",
  inseto: "bg-lime-100 text-lime-700",
  pedra: "bg-stone-200 text-stone-700",
  fantasma: "bg-violet-100 text-violet-700",
  dragao: "bg-indigo-200 text-indigo-800",
  noturno: "bg-slate-200 text-slate-700",
  aco: "bg-slate-100 text-slate-600",
  fada: "bg-rose-100 text-rose-700",
};


export default function TypeBadge({ tipo }) {
  const chave = tipo
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const cor = CORES_TIPO[chave] ?? "bg-stone-100 text-stone-700";

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${cor}`}>
      {tipo}
    </span>
  );
}