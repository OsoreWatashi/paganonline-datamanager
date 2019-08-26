export default class NodeFactory {
  private static nodes: Map<string, SkillTree.INode[]> = new Map<string, SkillTree.INode[]>();

  public static async getNodes(character: string): Promise<SkillTree.INode[]> {
    if (NodeFactory.nodes.has(character) === false) {
      const result = await fetch(`${process.env.VUE_APP_API}/skill/${character}`);
      NodeFactory.nodes.set(character, await result.json());
    }

    return NodeFactory.nodes.get(character) || [];
  }
}
