const POKEMON_NAMES = [
  "Pikachu",
  "Dracaufeu",
  "Tortank",
  "Florizarre",
] as const;

export const pokemons = [
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
  {
    name: "Tortank-Water",
    type: "Water",
    level: 36,
    stats: { hp: 79, attack: 83, defense: 100, speed: 78 },
  },
  {
    name: "Florizarre-Grass",
    type: "Grass",
    level: 32,
    stats: { hp: 80, attack: 82, defense: 83, speed: 80 },
  },
] as const;

type PokemonPsy = {
  name: string;
  type: "psy";
  lvlBonusToOtherPokemon: number;
  level: number;
  stats: { hp: 80; attack: 82; defense: 83; speed: 80 };
};

export type Pokemon = (typeof pokemons)[number] | PokemonPsy;
export type Stats = Pokemon["stats"];
export type OwnedPokemon = Pokemon & {
  ownedLevel: number;
};
export type PokemonName =
  `${(typeof POKEMON_NAMES)[number]}-${(typeof pokemons)[number]["type"]}`;
