import Vue from 'vue';
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
    selectedNode: null,
    filter: {
      name: ''
    }
  };
}

export default class Store implements Module<SkillTree.IState, any> {
  public namespaced: boolean = true;

  public state: SkillTree.IState = defaultState();

  public actions: ActionTree<SkillTree.IState, any> = {
    ROUTE_CHANGED(injectee: ActionContext<SkillTree.IState, any>, payload: Route): void {
      const character = CharacterFactory.getCharacterByTechnicalName(payload.params.char);
      if (character != null && character.technicalName !== injectee.state.character.technicalName) {
        injectee.dispatch('SELECTED_CHARACTER', character);
      }

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
      injectee.dispatch('FILTER_UPDATED', null);
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
    },
    FILTER_UPDATED(injectee: ActionContext<SkillTree.IState, any>, payload: { property: string, value: any } | null) {

      if (payload != null) {
        injectee.commit('FILTER_UPDATED', payload);
      }

      const nodeWalker = (node: SkillTree.IViewNode) => {
        const nameRegex = new RegExp(injectee.state.filter.name, 'i');

        const matchFilter = nameRegex.test(node.displayName);
        injectee.commit('UPDATE_NODE', { node, property: 'matchFilter', value: matchFilter });

        if (matchFilter === true && node.parent != null && node.parent.matchFilter === false) {
          injectee.commit('UPDATE_NODE', { node: node.parent, property: 'matchFilter', value: true });
        }

        for (const child of node.children) {
          nodeWalker(child);
        }
      };
      for (const node of injectee.state.nodes) {
        nodeWalker(node);
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
      Vue.set(payload.node, payload.property, payload.value);
    },
    FILTER_UPDATED(state: SkillTree.IState, payload: { property: string, value: any }): void {
      Vue.set(state.filter, payload.property, payload.value);
    }
  };
}
