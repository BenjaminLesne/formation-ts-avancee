import type { PokemonName } from "./database.js";
import type { PokemonGateway } from "./gateway.js";
import type { PokemonRepository } from "./repository.js";

export function addPokemonToPokedex(
  name: PokemonName,
  repository: PokemonRepository,
  gateway: PokemonGateway,
) {
  const existing = repository.findByName(name);

  if (existing) {
    repository.updatePokemon(name, {
      ...existing,
      ownedLevel: existing.ownedLevel + 1,
    });
    return `${name} est déjà dans le Pokédex ! Il passe au niveau ${existing.ownedLevel + 1}.`;
  }

  const pokemon = gateway.getAllPokemons().find((p) => p.name === name);

  if (!pokemon) {
    return `${name} n'existe pas.`;
  }

  repository.addPokemon({ ...pokemon, ownedLevel: 1 });
  return `${name} a été ajouté au Pokédex !`;
}
