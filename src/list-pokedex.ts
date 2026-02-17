import type { PokemonRepository } from "./repository.js";

export function listPokedex(repository: PokemonRepository) {
  const owned = repository.getAllOwnedPokemons();

  if (owned.length === 0) {
    return "Votre Pokédex est vide.";
  }

  const lines = owned.map(
    (p) => `- ${p.name} (${p.type}) — Niveau possédé : ${p.ownedLevel}`,
  );

  return `Pokédex (${owned.length} pokémon) :\n${lines.join("\n")}`;
}
