import type { OwnedPokemon, PokemonName } from "./pokemon.js";

const pokedex: OwnedPokemon[] = [];

export function addPokemon(pokemon: OwnedPokemon): void {
  pokedex.push(pokemon);
}

export function getAllOwnedPokemons() {
  return [...pokedex];
}

export function findByName(name: PokemonName) {
  return pokedex.find((p) => p.name === name);
}

export function updatePokemon(name: PokemonName, updated: OwnedPokemon): void {
  const index = pokedex.findIndex((p) => p.name === name);
  if (index !== -1) {
    pokedex[index] = updated;
  }
}
