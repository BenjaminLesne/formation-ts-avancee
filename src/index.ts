import { addPokemonToPokedex } from "./add-pokemon.js";
import { listPokedex } from "./list-pokedex.js";

// Ajout de pokemons au Pokédex
console.log(addPokemonToPokedex("Pikachu"));
console.log(addPokemonToPokedex("Dracaufeu"));
console.log(addPokemonToPokedex("Tortank"));

// "Mew" ne compile plus — TypeScript refuse les noms invalides
// @ts-expect-error: "Mew" n'est pas un PokemonName valide
console.log(addPokemonToPokedex("Mew"));

// Ajout d'un doublon → level up
console.log(addPokemonToPokedex("Pikachu"));
console.log(addPokemonToPokedex("Pikachu"));

console.log("\n" + listPokedex());
