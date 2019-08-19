export default class CharacterFactory {
  private static characters: SkillTree.ICharacter[];

  public static async getCharacters(): Promise<ReadonlyArray<SkillTree.ICharacter>> {
    if (CharacterFactory.characters == null) {
      const result = await fetch(`${process.env.VUE_APP_API}/character`);
      CharacterFactory.characters = await result.json();
    }

    return CharacterFactory.characters;
  }

  public static async getCharacterByTechnicalName(technicalName: string): Promise<Readonly<SkillTree.ICharacter> | undefined> {
    const characters = await CharacterFactory.getCharacters();
    return characters.find((x) => x.technicalName === technicalName);
  }
}
