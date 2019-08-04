declare namespace SkillTree {
  interface IState {
    character: ICharacter;
    nodes: IViewNode[];
    selectedNode: IViewNode | null;
    filter: INodeFilter;
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
    description: string;
    levelRequirement: number;
    minimumPoints: number;
    maximumPoints: number;
  }

  enum NodeType {
    ability = 'Ability',
    major = 'Major',
    minor = 'Minor'
  }

  interface IViewNode extends INode {
    parent?: IViewNode;
    children: IViewNode[];
    toggleState: string;
    matchFilter: boolean;
  }

  interface INodeFilter {
    name: string;
  }
}
