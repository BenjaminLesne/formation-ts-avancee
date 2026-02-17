import { describe, it, expect } from "vitest";
import { addPokemonToPokedex } from "./add-pokemon.js";
import type { PokemonGateway } from "./gateway.js";
import { createPokemonRepository } from "./repository.js";

const fakeGateway: PokemonGateway = {
  getAllPokemons() {
    return [
      {
        name: "Pikachu",
        type: "Electric",
        level: 25,
        stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
      },
      {
        name: "Dracaufeu",
        type: "Fire",
        level: 36,
        stats: { hp: 78, attack: 84, defense: 78, speed: 100 },
      },
    ] as const;
  },
};

describe("addPokemonToPokedex", () => {
  it("ajoute un pokémon au pokédex", () => {
    const repository = createPokemonRepository();

    const result = addPokemonToPokedex("Pikachu", repository, fakeGateway);

    expect(result).toBe("Pikachu a été ajouté au Pokédex !");
    expect(repository.findByName("Pikachu")).toMatchObject({
      name: "Pikachu",
      ownedLevel: 1,
    });
  });

  it("level up si le pokémon est déjà dans le pokédex", () => {
    const repository = createPokemonRepository();

    addPokemonToPokedex("Pikachu", repository, fakeGateway);
    const result = addPokemonToPokedex("Pikachu", repository, fakeGateway);

    expect(result).toBe(
      "Pikachu est déjà dans le Pokédex ! Il passe au niveau 2.",
    );
    expect(repository.findByName("Pikachu")?.ownedLevel).toBe(2);
  });

  it("retourne un message d'erreur si le pokémon n'existe pas dans la gateway", () => {
    const repository = createPokemonRepository();

    const result = addPokemonToPokedex(
      // @ts-expect-error: on teste avec un nom invalide
      "Mew",
      repository,
      fakeGateway,
    );

    expect(result).toBe("Mew n'existe pas.");
  });

  it("incrémente le niveau à chaque ajout successif", () => {
    const repository = createPokemonRepository();

    addPokemonToPokedex("Dracaufeu", repository, fakeGateway);
    addPokemonToPokedex("Dracaufeu", repository, fakeGateway);
    addPokemonToPokedex("Dracaufeu", repository, fakeGateway);

    expect(repository.findByName("Dracaufeu")?.ownedLevel).toBe(3);
  });
});
