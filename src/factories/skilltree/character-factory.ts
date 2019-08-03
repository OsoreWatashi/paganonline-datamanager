import { ICharacter } from '@/types';

const characters: ICharacter[] = [
  { displayName: 'Anya', technicalName: 'anya' },
  { displayName: 'Dameer', technicalName: 'dameer' },
  { displayName: 'Istok', technicalName: 'istok' },
  { displayName: 'Kingewitch', technicalName: 'kingewitch' },
  { displayName: 'Lukian', technicalName: 'lukian' },
  { displayName: 'Marokh', technicalName: 'marokh' },
  { displayName: 'Masha', technicalName: 'masha' },
  { displayName: 'Valeria', technicalName: 'valeria' }].sort((x, y) => x.displayName < y.displayName ? -1 : 1);

export default class CharacterFactory {
  public static getCharacters(): ReadonlyArray<ICharacter> {
    return characters;
  }

  public static getCharacterByTechnicalName(technicalName: string): Readonly<ICharacter> | undefined {
    return characters.find((x) => x.technicalName === technicalName);
  }
}
