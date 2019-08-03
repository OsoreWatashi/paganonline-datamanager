import Vue from 'vue';
import Vuex from 'vuex';
import SkillTree from './modules/skilltree';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    SkillTree: new SkillTree()
  }
});
