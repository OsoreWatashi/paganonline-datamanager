declare namespace SkillTree {
  interface IState {
    characters: ICharacter[];
    selectedCharacter: ICharacter;
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
    parentID?: number;
    displayName: string;
    technicalName: string;
    type: string;
    description: string;
    levelRequirement: number;
    minimumPoints: number;
    maximumPoints: number;
    isNew: boolean;
    isDeleted: boolean;

    effects?: IEffect[];
  }

  interface IEffect {
    level: number;
    sequence: number;
    description: string;
    isDeleted: boolean;
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
