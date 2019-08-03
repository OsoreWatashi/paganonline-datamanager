import { Module, ActionTree, ActionContext, MutationTree } from 'vuex';
import { Route } from 'vue-router';
import CharacterFactory from '@/factories/skilltree/character-factory';

const defaultState: SkillTree.IState = {
  selectedCharacter: {
    displayName: '',
    technicalName: ''
  }
};

export default class Store implements Module<SkillTree.IState, any> {
  public namespaced: boolean = true;

  public state: SkillTree.IState = defaultState;

  public actions: ActionTree<SkillTree.IState, any> = {
    ROUTE_CHANGED(injectee: ActionContext<SkillTree.IState, any>, payload: Route): void {
      let character = CharacterFactory.getCharacterByTechnicalName(payload.params.char);
      if (character == null) {
        character = defaultState.selectedCharacter;
      }

      injectee.commit('SELECTED_CHARACTER', character);
    }
  };

  public mutations: MutationTree<SkillTree.IState> = {
    SELECTED_CHARACTER(state: SkillTree.IState, payload: SkillTree.ICharacter): void {
      state.selectedCharacter = payload;
    }
  };
}
