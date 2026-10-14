export const CORES_COLECAO = {
  azul:    { card: "bg-blue-100",   icone: "text-blue-600",   badge: "bg-blue-100 text-blue-700",     numero: "text-blue-600", swatch: "bg-blue-500", borda: "border-blue-300 border-2"},
  rosa:    { card: "bg-pink-100",   icone: "text-pink-600",   badge: "bg-pink-100 text-pink-700",     numero: "text-pink-600", swatch: "bg-pink-500", borda: "border-pink-300 border-2"},
  verde:   { card: "bg-green-100",  icone: "text-green-600",  badge: "bg-green-100 text-green-700",   numero: "text-green-600", swatch: "bg-green-500", borda: "border-green-300 border-2"},
  roxo:    { card: "bg-purple-100", icone: "text-purple-600", badge: "bg-purple-100 text-purple-700", numero: "text-purple-600", swatch: "bg-purple-500", borda: "border-purple-300 border-2"},
  laranja: { card: "bg-orange-100", icone: "text-orange-600", badge: "bg-orange-100 text-orange-700", numero: "text-orange-600", swatch: "bg-orange-500", borda: "border-orange-300 border-2"},
  ciano:   { card: "bg-teal-100",   icone: "text-teal-600",   badge: "bg-teal-100 text-teal-700",     numero: "text-teal-600", swatch: "bg-teal-500", borda: "border-teal-300 border-2"},
};
export const ICONES_COLECAO = {
  raio: "⚡", estrela: "⭐", lixeira: "🗑️", coracao: "❤️",
  escudo: "🛡️", folha: "🍃", chama: "🔥", gota: "💧",
};

export const iconeDaColecao = (icone) => ICONES_COLECAO[icone] ?? "📁";
export const corDaColecao = (cor) => CORES_COLECAO[cor] ?? CORES_COLECAO.azul;

