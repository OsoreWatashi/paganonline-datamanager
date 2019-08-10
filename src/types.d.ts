declare namespace SkillTree {
  interface IState {
    character: ICharacter;
    nodes: IViewNode[];
    selectedNode: IViewNode | null;
    filter: INodeFilter;
    highestNodeId: number;
    updatedNodes: IUpdatedNode[];
  }

  interface ICharacter {
    displayName: string;
    technicalName: string;
  }

  interface INode {
    id: number;
    parentId?: number;
    displayName: string;
    technicalName: string;
    type: string;
    description: string;
    levelRequirement: number;
    minimumPoints: number;
    maximumPoints: number;

    effects?: IEffect[];
  }

  interface IEffect {
    level: number;
    sequence: number;
    text: string;
  }

  interface IViewNode extends INode {
    effects: IEffect[];
    parent?: IViewNode;
    children: IViewNode[];
    toggleState: string;
    matchFilter: boolean;
  }

  interface IUpdatedNode {
    character: ICharacter;
    node: INode;
  }

  interface INodeFilter {
    name: string;
  }
}
