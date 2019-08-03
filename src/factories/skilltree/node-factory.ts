import Anya from '@/assets/skilltree/characters/nodes/anya';

export default class NodeFactory {
  public static getNodes(character: string): SkillTree.INode[] {
    switch (character) {
      case 'anya': return Anya;
      case 'dameer': return[];
      case 'istok': return [];
      case 'kingewitch': return[];
      case 'lukian': return[];
      case 'masha': return[];
      case 'morokh': return[];
      case 'valeria': return[];

      default: return [];
    }
  }
}
