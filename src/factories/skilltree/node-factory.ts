export default class NodeFactory {
  private static nodes: Map<string, SkillTree.INode[]> = new Map<string, SkillTree.INode[]>();

  public static removeCache(character: string): void {
    NodeFactory.nodes.delete(character);
  }

  public static async getNodes(character: string): Promise<SkillTree.INode[]> {
    if (NodeFactory.nodes.has(character) === false) {
      const result = await fetch(`${process.env.VUE_APP_API}/skill/${character}`);
      NodeFactory.nodes.set(character, await result.json());
    }

    return NodeFactory.nodes.get(character) || [];
  }

  public static async getEffects(node: SkillTree.INode): Promise<SkillTree.IEffect[]> {
    const result = await fetch(`${process.env.VUE_APP_API}/skilleffect/${node.id}`);
    return await result.json() || [];
  }

  public static async createNode(characterTechnicalName: string, node: SkillTree.INode): Promise<boolean> {
    node.id = 0;

    const result = await fetch(`${process.env.VUE_APP_API}/skill/${characterTechnicalName}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(node, (key, value) => ['children', 'parent'].every((x) => key !== x) ? value : undefined)
    });
    if (result.ok !== true) {
      return result.ok;
    }

    const createdNodeResult = await fetch(`${process.env.VUE_APP_API}/skill/${characterTechnicalName}/${node.technicalName}`);
    const createdNode = await createdNodeResult.json();
    node.id = createdNode.id;

    return result.ok;
  }

  public static async deleteNode(characterTechnicalName: string, technicalName: string): Promise<boolean> {
    const result = await fetch(`${process.env.VUE_APP_API}/skill/${characterTechnicalName}/${technicalName}`, {
      method: 'DELETE'
    });
    return result.ok;
  }

  public static async updateNode(characterTechnicalName: string, node: SkillTree.INode): Promise<boolean> {
    const result = await fetch(`${process.env.VUE_APP_API}/skill/${characterTechnicalName}/${node.technicalName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(node, (key, value) => ['children', 'parent'].every((x) => key !== x) ? value : undefined)
    });
    return result.ok;
  }

  public static async createEffect(nodeID: number, effect: SkillTree.IEffect): Promise<boolean> {
    const result = await fetch(`${process.env.VUE_APP_API}/skilleffect/${nodeID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(effect)
    });
    return result.ok;
  }

  public static async deleteEffect(nodeID: number, level: number, sequence: number): Promise<boolean> {
    const result = await fetch(`${process.env.VUE_APP_API}/skilleffect/${nodeID}/${level}/${sequence}`, {
      method: 'DELETE'
    });
    return result.ok;
  }

  public static async updateEffect(nodeID: number, effect: SkillTree.IEffect): Promise<boolean> {
    const result = await fetch(`${process.env.VUE_APP_API}/skilleffect/${nodeID}/${effect.level}/${effect.sequence}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(effect)
    });
    return result.ok;
  }
}
