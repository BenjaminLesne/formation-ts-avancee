import { describe, it, expect } from "vitest";
import { addPokemonToPokedex } from "./add-pokemon.js";
import type { PokemonGateway } from "./gateway.js";
import { createPokemonRepository } from "./repository.js";

const fakeGateway: PokemonGateway = {
  getAllPokemons() {
    return [
      {
        name: "Pikachu-Electric",
        type: "Electric",
        level: 25,
        stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
      },
      {
        name: "Dracaufeu-Fire",
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

    const result = addPokemonToPokedex(
      "Pikachu-Electric",
      repository,
      fakeGateway,
    );

    expect(result).toBe("Pikachu-Electric a été ajouté au Pokédex !");
    expect(repository.findByName("Pikachu-Electric")).toMatchObject({
      name: "Pikachu-Electric",
      ownedLevel: 1,
    });
  });

  it("level up si le pokémon est déjà dans le pokédex", () => {
    const repository = createPokemonRepository();

    addPokemonToPokedex("Pikachu-Electric", repository, fakeGateway);
    const result = addPokemonToPokedex(
      "Pikachu-Electric",
      repository,
      fakeGateway,
    );

    expect(result).toBe(
      "Pikachu-Electric est déjà dans le Pokédex ! Il passe au niveau 2.",
    );
    expect(repository.findByName("Pikachu-Electric")?.ownedLevel).toBe(2);
  });

  it("retourne un message d'erreur si le pokémon n'existe pas dans la gateway", () => {
    const repository = createPokemonRepository();

    const result = addPokemonToPokedex(
      // @ts-expect-error: on teste avec un nom invalide
      "Mew-Psychic",
      repository,
      fakeGateway,
    );

    expect(result).toBe("Mew-Psychic n'existe pas.");
  });

  it("incrémente le niveau à chaque ajout successif", () => {
    const repository = createPokemonRepository();

    addPokemonToPokedex("Dracaufeu-Fire", repository, fakeGateway);
    addPokemonToPokedex("Dracaufeu-Fire", repository, fakeGateway);
    addPokemonToPokedex("Dracaufeu-Fire", repository, fakeGateway);

    expect(repository.findByName("Dracaufeu-Fire")?.ownedLevel).toBe(3);
  });

  it("ajouter un pokémon psy donne +2 niveaux à tous les autres", () => {
    const repository = createPokemonRepository();

    addPokemonToPokedex("Pikachu-Electric", repository, fakeGateway);
    addPokemonToPokedex("Dracaufeu-Fire", repository, fakeGateway);

    addPokemonToPokedex(
      // @ts-expect-error: nom psy pas dans la gateway typée
      "Mewtwo-Psy",
      repository,
      {
        getAllPokemons: () => [
          {
            name: "Mewtwo-Psy",
            type: "psy",
            level: 70,
            lvlBonusToOtherPokemon: 2,
            stats: { hp: 80, attack: 82, defense: 83, speed: 80 },
          },
        ],
      } satisfies PokemonGateway,
      { name: "Mewtwo", type: "psy", lvlBonusToOtherPokemon: 2 },
    );

    expect(repository.findByName("Pikachu-Electric")?.ownedLevel).toBe(3);
    expect(repository.findByName("Dracaufeu-Fire")?.ownedLevel).toBe(3);
  });
});
