declare namespace SkillTree {
  interface IState {
    character: ICharacter;
    nodes: IViewNode[];
  }

  interface ICharacter {
    displayName: string;
    technicalName: string;
  }

  interface INode {
    id: number,
    parentId?: number;
    displayName: string;
    technicalName: string;
    type: NodeType;
  }

  enum NodeType {
    ability = 'Ability',
    major = 'Major',
    minor = 'Minor'
  }

  interface IViewNode extends INode {
    children: IViewNode[];
    toggleState: string;
  }
}
