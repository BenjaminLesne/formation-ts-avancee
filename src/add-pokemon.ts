import type { PokemonName } from "./pokemon.js";
import { getAllPokemons } from "./gateway.js";
import { addPokemon, findByName, updatePokemon } from "./repository.js";

export function addPokemonToPokedex(name: PokemonName) {
  const existing = findByName(name);

  if (existing) {
    updatePokemon(name, { ...existing, ownedLevel: existing.ownedLevel + 1 });
    return `${name} est déjà dans le Pokédex ! Il passe au niveau ${existing.ownedLevel + 1}.`;
  }

  const pokemon = getAllPokemons().find((p) => p.name === name);

  if (!pokemon) {
    return `${name} n'existe pas.`;
  }

  addPokemon({ ...pokemon, ownedLevel: 1 });
  return `${name} a été ajouté au Pokédex !`;
}
