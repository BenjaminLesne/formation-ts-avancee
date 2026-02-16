const pokemons = [
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
  {
    name: "Tortank",
    type: "Water",
    level: 36,
    stats: { hp: 79, attack: 83, defense: 100, speed: 78 },
  },
  {
    name: "Florizarre",
    type: "Grass",
    level: 32,
    stats: { hp: 80, attack: 82, defense: 83, speed: 80 },
  },
];

function pokemon(pokemon: (typeof pokemons)[number]) {
  console.log(
    `Le Pokémon ${pokemon.name} est de type ${pokemon.type} et a un niveau de ${pokemon.level}.`,
  );
}
