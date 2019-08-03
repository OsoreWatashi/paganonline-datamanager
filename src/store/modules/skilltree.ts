import { Module, ActionTree, ActionContext, MutationTree } from 'vuex';
import { Route } from 'vue-router';
import CharacterFactory from '@/factories/skilltree/character-factory';
import NodeFactory from '@/factories/skilltree/node-factory';


function defaultState(): SkillTree.IState {
  return {
    character: {
      displayName: '',
      technicalName: ''
    }, nodes: []
  };
}

export default class Store implements Module<SkillTree.IState, any> {
  public namespaced: boolean = true;

  public state: SkillTree.IState = defaultState();

  public actions: ActionTree<SkillTree.IState, any> = {
    ROUTE_CHANGED(injectee: ActionContext<SkillTree.IState, any>, payload: Route): void {
      const character = CharacterFactory.getCharacterByTechnicalName(payload.params.char);
      injectee.dispatch('SELECTED_CHARACTER', character);
    },
    SELECTED_CHARACTER(injectee: ActionContext<SkillTree.IState, any>, payload: SkillTree.ICharacter | string | undefined): void {
      let character = payload as SkillTree.ICharacter | undefined;
      if (typeof payload === 'string') {
        character = CharacterFactory.getCharacterByTechnicalName(payload);
      }
      if (character == null) {
        character = defaultState().character;
      }

      const nodes = NodeFactory.getNodes(character.technicalName);

      injectee.commit('SELECTED_CHARACTER', character);
      injectee.commit('NODES_UPDATED', nodes);
    }
  };

  public mutations: MutationTree<SkillTree.IState> = {
    SELECTED_CHARACTER(state: SkillTree.IState, payload: SkillTree.ICharacter): void {
      state.character = payload;
    },
    NODES_UPDATED(state: SkillTree.IState, payload: SkillTree.INode[]): void {
      state.nodes = payload;
    }
  };
}
