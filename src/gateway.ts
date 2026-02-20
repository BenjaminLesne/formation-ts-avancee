import type { Pokemon } from "./database.js";
import { pokemons } from "./database.js";

export type PokemonGateway = typeof pokemonGateway;

export const pokemonGateway = {
  getAllPokemons() {
    return pokemons;
  },
  getPokemonByType<T extends Pokemon>(type: T["type"]): T {
    const result = pokemons.filter((pokemon) => pokemon.type === type);

    return result;
  },
};

const test = pokemonGateway.getPokemonByType("Fire");
