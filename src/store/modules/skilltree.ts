import { Module, ActionTree, ActionContext, MutationTree } from 'vuex';
import { Route } from 'vue-router';
import Router from '@/router';
import CharacterFactory from '@/factories/skilltree/character-factory';
import NodeFactory from '@/factories/skilltree/node-factory';


function defaultState(): SkillTree.IState {
  return {
    character: {
      displayName: '',
      technicalName: ''
    }, nodes: [],
    selectedNode: null
  };
}

export default class Store implements Module<SkillTree.IState, any> {
  public namespaced: boolean = true;

  public state: SkillTree.IState = defaultState();

  public actions: ActionTree<SkillTree.IState, any> = {
    ROUTE_CHANGED(injectee: ActionContext<SkillTree.IState, any>, payload: Route): void {
      const character = CharacterFactory.getCharacterByTechnicalName(payload.params.char);
      injectee.dispatch('SELECTED_CHARACTER', character);

      if (payload.params.id != null) {
        const id: number = parseInt(payload.params.id, 10);
        const nodeWalker = (node: SkillTree.IViewNode): boolean => {
          if (node.id === id) {
            injectee.dispatch('SELECT_NODE', node);
            return true;
          }

          if (node.children.length > 0) {
            for (const child of node.children) {
              if (nodeWalker(child)) {
                return true;
              }
            }
          }

          return false;
        };
        for (const node of injectee.state.nodes) {
          if (nodeWalker(node)) {
            break;
          }
        }
      }
    },
    SELECTED_CHARACTER(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.ICharacter | string | undefined): void {
      let character = payload as SkillTree.ICharacter | undefined;
      if (typeof payload === 'string') {
        character = CharacterFactory.getCharacterByTechnicalName(payload);
      }
      if (character == null) {
        character = defaultState().character;
      }

      injectee.commit('SELECTED_CHARACTER', character);

      const nodes = NodeFactory.getNodes(character.technicalName);
      injectee.dispatch('NODES_UPDATED', nodes);
      injectee.commit('SELECT_NODE', {});
    },
    NODES_UPDATED(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.INode[]): void {
      const nodeWalker = (node: SkillTree.IViewNode) => {
        node.children = payload.filter((x) => x.parentId === node.id) as SkillTree.IViewNode[];
        node.toggleState = node.children.length < 1 ? ' ' : node.toggleState || '+';
        for (const child of node.children) {
          child.parent = node;
          nodeWalker(child);
        }
      };

      const rootNodes = payload.filter((x) => x.parentId == null) as SkillTree.IViewNode[];
      for (const rootNode of rootNodes) {
        nodeWalker(rootNode);
      }

      injectee.commit('NODES_UPDATED', rootNodes);
    },
    TOGGLE_NODE(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.IViewNode): void {
      let toggleState = ' ';
      switch (payload.toggleState) {
        case '-': toggleState = '+'; break;
        case '+': toggleState = '-'; break;

        case ' ':
        default: return;
      }

      injectee.commit('TOGGLE_NODE', { node: payload, toggleState });
    },
    SELECT_NODE(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.IViewNode): void {
      if (injectee.state.selectedNode == null || injectee.state.selectedNode.id !== payload.id) {
        injectee.commit('SELECT_NODE', payload);
        for (let parent = payload.parent; parent != null; parent = parent.parent) {
          injectee.commit('TOGGLE_NODE', { node: parent, toggleState: '-' });
        }
        Router.push({ path: '/skilltree/' + Router.currentRoute.params.char + '/' + payload.id });
      }
    }
  };

  public mutations: MutationTree<SkillTree.IState> = {
    SELECTED_CHARACTER(state: SkillTree.IState, payload: SkillTree.ICharacter): void {
      state.character = payload;
    },
    NODES_UPDATED(state: SkillTree.IState, payload: SkillTree.IViewNode[]): void {
      state.nodes = payload;
    },
    TOGGLE_NODE(state: SkillTree.IState, payload: { node: SkillTree.IViewNode, toggleState: string }): void {
      payload.node.toggleState = payload.toggleState;
    },
    SELECT_NODE(state: SkillTree.IState, payload: SkillTree.IViewNode): void {
      state.selectedNode = payload.id != null ? payload : null;
    },
    UPDATE_NODE(state: SkillTree.IState, payload: { node: SkillTree.IViewNode, property: string, value: any }): void {
      const castedNode = payload.node as any;
      castedNode[payload.property] = payload.value;
    }
  };
}
