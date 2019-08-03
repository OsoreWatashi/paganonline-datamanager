import { Module } from 'vuex';

const defaultState: SkillTree.IState = {
  selectedCharacter: {
    displayName: '',
    technicalName: ''
  }
};

export default class Store implements Module<SkillTree.IState, any> {
  public namespaced: boolean = true;

  public state: SkillTree.IState = defaultState;
}
