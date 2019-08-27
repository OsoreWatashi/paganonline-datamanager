import Vue from 'vue';
import { Module, ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex';
import { Route } from 'vue-router';
import Router from '@/router';
import CharacterFactory from '@/factories/skilltree/character-factory';
import NodeFactory from '@/factories/skilltree/node-factory';


function defaultState(): SkillTree.IState {
  return {
    characters: [],
    selectedCharacter: {
      displayName: '',
      technicalName: ''
    }, nodes: [],
    selectedNode: null,
    filter: {
      name: ''
    },
    highestNodeId: 0,
    updatedNodes: []
  };
}

function defaultEffect(): SkillTree.IEffect {
  return {
    level: 1,
    sequence: 1,
    description: ''
  };
}

function defaultViewNode(): SkillTree.IViewNode {
  return {
    id: -1,
    displayName: 'New ability',
    technicalName: 'newability',
    type: 'Ability',
    description: '',
    levelRequirement: 1,
    minimumPoints: 0,
    maximumPoints: 3,
    isNew: true,

    effects: [],
    children: [],
    toggleState: ' ',
    matchFilter: true
  };
}

export default class Store implements Module<SkillTree.IState, any> {
  public namespaced: boolean = true;

  public state: SkillTree.IState = defaultState();

  public getters: GetterTree<SkillTree.IState, any> = {
    nodesUpdated(state: SkillTree.IState): boolean {
      return state.updatedNodes.some((x) => x.character.technicalName === state.selectedCharacter.technicalName);
    }
  };

  public actions: ActionTree<SkillTree.IState, any> = {
    async ROUTE_CHANGED(injectee: ActionContext<SkillTree.IState, any>, payload: Route): Promise<void> {
      const character = await CharacterFactory.getCharacterByTechnicalName(payload.params.char);
      if (character != null && character.technicalName !== injectee.state.selectedCharacter.technicalName) {
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
      } else {
        injectee.commit('SELECT_NODE', {});
      }
    },
    async LOAD_CHARACTERS(injectee: ActionContext<SkillTree.IState, any>, payload: undefined): Promise<void> {
      const characters = await CharacterFactory.getCharacters();
      injectee.commit('SET_CHARACTERS', characters);
    },
    async SELECTED_CHARACTER(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.ICharacter | string | undefined): Promise<void> {
      let character = payload as SkillTree.ICharacter | undefined;
      if (typeof payload === 'string') {
        character = await CharacterFactory.getCharacterByTechnicalName(payload);
      }
      if (character == null) {
        character = defaultState().selectedCharacter;
      }

      injectee.commit('SELECTED_CHARACTER', character);

      const nodes = await NodeFactory.getNodes(character.technicalName);
      if (character != null) {
        const updatedNodes = injectee.state.updatedNodes.filter((x) => x.character.technicalName === character!.technicalName &&
                                                                       x.node.isNew === true &&
                                                                       nodes.every((y) => y.id !== x.node.id));
        for (const updatedNode of updatedNodes) {
          nodes.push(updatedNode.node);
        }
      }

      injectee.dispatch('NODES_UPDATED', nodes);
      injectee.commit('SELECT_NODE', {});
    },
    NODES_UPDATED(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.INode[]): void {
      let highestNodeId: number = 0;
      const nodeWalker = (node: SkillTree.IViewNode) => {
        node.children = payload.filter((x) => x.parentID === node.id) as SkillTree.IViewNode[];
        node.toggleState = node.children.length < 1 ? ' ' : node.toggleState || '+';
        for (const child of node.children) {
          child.parent = node;
          nodeWalker(child);
        }

        if (node.id > highestNodeId) {
          highestNodeId = node.id;
        }
      };

      const rootNodes = payload.filter((x) => x.parentID == null) as SkillTree.IViewNode[];
      for (const rootNode of rootNodes) {
        nodeWalker(rootNode);
      }

      injectee.commit('NODES_UPDATED', rootNodes);
      injectee.commit('HIGHEST_NODE_ID_CHANGED', highestNodeId);
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
    async SELECT_NODE(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.IViewNode): Promise<void> {
      if (injectee.state.selectedNode == null || injectee.state.selectedNode.id !== payload.id) {
        injectee.commit('SELECT_NODE', payload);
        for (let parent = payload.parent; parent != null; parent = parent.parent) {
          injectee.commit('TOGGLE_NODE', { node: parent, toggleState: '-' });
        }
        Router.push({ path: '/skilltree/' + Router.currentRoute.params.char + '/' + payload.id });

        if (payload.effects == null) {
          const effects = await NodeFactory.getEffects(payload);
          injectee.commit('UPDATE_NODE', { node: payload, property: 'effects', value: effects, skipUpdate: true });
        }
      }
    },
    FILTER_UPDATED(injectee: ActionContext<SkillTree.IState, any>, payload: { property: string, value: any } | null): void {
      if (payload != null) {
        injectee.commit('FILTER_UPDATED', payload);
      }

      const nodeWalker = (node: SkillTree.IViewNode) => {
        const nameRegex = new RegExp(injectee.state.filter.name, 'i');

        const matchFilter = nameRegex.test(node.displayName);
        if (node.matchFilter !== matchFilter) {
          injectee.commit('UPDATE_NODE', { node, property: 'matchFilter', value: matchFilter });
        }

        if (matchFilter === true) {
          for (let parent = node.parent; parent != null && parent.matchFilter !== true; parent = parent.parent) {
            injectee.commit('UPDATE_NODE', { node: parent, property: 'matchFilter', value: true });
          }
        }

        for (const child of node.children) {
          nodeWalker(child);
        }
      };
      for (const node of injectee.state.nodes) {
        nodeWalker(node);
      }

      if (injectee.state.selectedNode != null && injectee.state.selectedNode.matchFilter !== true) {
        injectee.commit('SELECT_NODE', {});
      }
    },
    UPDATE_NODE_EFFECTS(injectee: ActionContext<SkillTree.IState, any>, payload: { node: SkillTree.IViewNode, action: string; level?: number, effect?: SkillTree.IEffect }): void {
      let index: number = -1;
      switch (payload.action) {
        case 'ADD':
          const effect = defaultEffect();
          effect.level = payload.level!;
          if (payload.node.effects.length > 0) {
            const sameLevelEffects = payload.node.effects.filter((x) => x.level === payload.level!);
            if (sameLevelEffects.length > 0) {
              effect.sequence = sameLevelEffects.reduce((x, y) => x.level > y.level ? x : y).sequence + 1;
            }
          }

          payload.node.effects.push(effect);
          break;

        case 'REMOVE':
          index = payload.node.effects.findIndex((x) => x.level === payload.effect!.level && x.sequence === payload.effect!.sequence);
          payload.node.effects.splice(index, 1);
          break;

        case 'UPDATE':
          index = payload.node.effects.findIndex((x) => x.level === payload.effect!.level && x.sequence === payload.effect!.sequence);
          payload.node.effects[index] = payload.effect!;
          break;
      }

      injectee.commit('UPDATE_NODE', { node: payload.node, property: 'effects', value: payload.node.effects });
    },
    ADD_NODE(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.IViewNode | null): void {
      const node = defaultViewNode();
      node.id = injectee.state.highestNodeId + 1;

      if (payload != null) {
        node.parentID = payload.id;
        node.parent = payload;
        payload.children.push(node);
        injectee.commit('UPDATE_NODE', { node: payload, property: 'children', value: payload.children });

        if (payload.children.length === 1) {
          injectee.commit('TOGGLE_NODE', { node: payload, toggleState: '-' });
        }
      } else {
        injectee.state.nodes.push(node);
        injectee.commit('NODES_UPDATED', injectee.state.nodes);
      }

      injectee.commit('HIGHEST_NODE_ID_CHANGED', node.id);
      injectee.dispatch('SELECT_NODE', node);
    },
    DELETE_NODE(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.IViewNode): void {
      if (payload.parent != null) {
        const index = payload.parent.children.findIndex((x) => x.id === payload.id);
        payload.parent.children.splice(index, 1);
        injectee.commit('UPDATE_NODE', { node: payload.parent, property: 'children', value: payload.parent.children });

        if (payload.parent.children.length < 1) {
          injectee.commit('TOGGLE_NODE', { node: payload.parent, toggleState: ' ' });
        }
      } else {
        const index = injectee.state.nodes.findIndex((x) => x.id === payload.id);
        injectee.state.nodes.splice(index, 1);
        injectee.commit('NODES_UPDATED', injectee.state.nodes);
      }

      if (injectee.state.selectedNode!.id === payload.id) {
        injectee.commit('SELECT_NODE', {});
      }
    },
    SAVE_CHARACTER(injectee: ActionContext<SkillTree.IState, any>, payload: null) {
      // TOOD: Submit state.updatedNodes somewhere
      injectee.commit('CHARACTER_SAVED', {});
    }
  };

  public mutations: MutationTree<SkillTree.IState> = {
    SET_CHARACTERS(state: SkillTree.IState, payload: SkillTree.ICharacter[]): void {
      state.characters = payload;
    },
    SELECTED_CHARACTER(state: SkillTree.IState, payload: SkillTree.ICharacter): void {
      state.selectedCharacter = payload;
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
    UPDATE_NODE(state: SkillTree.IState, payload: { node: SkillTree.IViewNode, property: string, value: any, skipUpdate?: boolean }): void {
      Vue.set(payload.node, payload.property, payload.value);

      if (payload.skipUpdate !== true && ['parent', 'children', 'toggleState', 'matchFilter'].every((x) => x !== payload.property)) {
        if (!state.updatedNodes.some((x) => x.character.technicalName === state.selectedCharacter.technicalName && x.node.id === payload.node.id)) {
          state.updatedNodes.push({ character: state.selectedCharacter, node: payload.node });
        }
      }
    },
    FILTER_UPDATED(state: SkillTree.IState, payload: { property: string, value: any }): void {
      Vue.set(state.filter, payload.property, payload.value);
    },
    HIGHEST_NODE_ID_CHANGED(state: SkillTree.IState, payload: number): void {
      state.highestNodeId = payload;
    }, CHARACTER_SAVED(state: SkillTree.IState, payload: null): void {
      state.updatedNodes = state.updatedNodes.filter((x) => x.character.technicalName !== state.selectedCharacter.technicalName);
    }
  };
}
