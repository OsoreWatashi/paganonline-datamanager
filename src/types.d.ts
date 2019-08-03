declare namespace SkillTree {
  interface IState {
    character: ICharacter;
    nodes: INode[];
  }

  interface ICharacter {
    displayName: string;
    technicalName: string;
  }

  interface INode {
    id: number,
    displayName: string;
    technicalName: string;
    type: NodeType;
  }

  enum NodeType {
    ability = 'Ability',
    major = 'Major',
    minor = 'Minor'
  }
}
