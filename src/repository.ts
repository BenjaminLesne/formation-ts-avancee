import type { OwnedPokemon, PokemonName } from "./database.js";

export interface PokemonRepository {
  addPokemon(pokemon: OwnedPokemon): void;
  getAllOwnedPokemons(): OwnedPokemon[];
  findByName(name: PokemonName): OwnedPokemon | undefined;
  updatePokemon(name: PokemonName, updated: OwnedPokemon): void;
}

export function createPokemonRepository(): PokemonRepository {
  const pokedex: OwnedPokemon[] = [];

  return {
    addPokemon(pokemon: OwnedPokemon): void {
      pokedex.push(pokemon);
    },

    getAllOwnedPokemons() {
      return [...pokedex];
    },

    findByName(name: PokemonName) {
      return pokedex.find((p) => p.name === name);
    },

    updatePokemon(name: PokemonName, updated: OwnedPokemon): void {
      const index = pokedex.findIndex((p) => p.name === name);
      if (index !== -1) {
        pokedex[index] = updated;
      }
    },
  };
}
