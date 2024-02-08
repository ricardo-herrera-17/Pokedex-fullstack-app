export interface SavePokemonsUseCase {
  execute: (email: string, pokemons: number[]) => Promise<boolean>;
}
