import type { Pokemon } from "./database.js";
import { pokemons } from "./database.js";

export interface PokemonGateway {
  getAllPokemons(): readonly Pokemon[];
}

export const pokemonGateway: PokemonGateway = {
  getAllPokemons() {
    return pokemons;
  },
};
