type PokemonBase = {
  name: string;
};

type PokemonPsy = PokemonBase & {
  type: "psy";
  lvlBonusToOtherPokemon: 2;
};

type PokemonElec = PokemonBase & {
  type: "elec";
};

export type Pokemon = PokemonPsy | PokemonElec;

export function isPsyPokemon(pokemon: Pokemon): pokemon is PokemonPsy {
  return pokemon.type === "psy";
}
