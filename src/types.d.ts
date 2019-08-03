declare namespace SkillTree {
  interface IState {
    selectedCharacter: ICharacter;
  }

  interface ICharacter {
    displayName: string;
    technicalName: string;
  }
}
