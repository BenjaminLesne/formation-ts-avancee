import type { PokemonName } from "./database.js";
import type { PokemonGateway } from "./gateway.js";
import type { PokemonRepository } from "./repository.js";
import type { Pokemon } from "./pokemon-types.js";
import { isPsyPokemon } from "./pokemon-types.js";

export function addPokemonToPokedex(
  name: PokemonName,
  repository: PokemonRepository,
  gateway: PokemonGateway,
  pokemonType?: Pokemon,
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

  if (pokemonType && isPsyPokemon(pokemonType)) {
    const allOwned = repository.getAllOwnedPokemons();
    for (const owned of allOwned) {
      if (owned.name !== name) {
        repository.updatePokemon(owned.name, {
          ...owned,
          ownedLevel: owned.ownedLevel + pokemonType.lvlBonusToOtherPokemon,
        });
      }
    }
  }

  return `${name} a été ajouté au Pokédex !`;
}
