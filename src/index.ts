import { addPokemonToPokedex } from "./add-pokemon.js";
import { pokemonGateway } from "./gateway.js";
import { listPokedex } from "./list-pokedex.js";
import { createPokemonRepository } from "./repository.js";

const repository = createPokemonRepository();
const gateway = pokemonGateway;

// Ajout de pokemons au Pokédex
console.log(addPokemonToPokedex("Pikachu", repository, gateway));
console.log(addPokemonToPokedex("Dracaufeu", repository, gateway));
console.log(addPokemonToPokedex("Tortank", repository, gateway));

// "Mew" ne compile plus — TypeScript refuse les noms invalides
// @ts-expect-error: "Mew" n'est pas un PokemonName valide
console.log(addPokemonToPokedex("Mew", repository, gateway));

// Ajout d'un doublon → level up
console.log(addPokemonToPokedex("Pikachu", repository, gateway));
console.log(addPokemonToPokedex("Pikachu", repository, gateway));

console.log("\n" + listPokedex(repository));
