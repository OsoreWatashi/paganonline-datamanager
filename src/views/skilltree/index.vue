<template>
  <div class="skilltree-view">
    <div class="menu">
      <div class="menu-left">
        <a href="javascript:void(0)" class="button" :class="nodesUpdated === false ? 'disabled' : ''" @click="saveCharacter">Save character</a>
      </div>
      <div class="menu-right">
        <a class="button" href="javascript:void(0)" @click="addRootNode">Add root node</a>
        <a class="button" href="javascript:void(0)" :class="this.$store.state.SkillTree.selectedNode == null ? 'disabled' : ''" @click="deleteSelectedNode">Delete node</a>
      </div>
    </div>

    <div class="navigation">
      <node-filter class="filter" />
      <node-tree :nodes="nodes" />
    </div>
    <node-card v-if="selectedNode != null" class="node-card" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';
import NodeFilter from '@/components/skilltree/node-filter.vue';
import NodeTree from '@/components/skilltree/node-tree.vue';
import NodeCard from '@/components/skilltree/node-card.vue';
import CharacterFactory from '@/factories/skilltree/character-factory';

@Component({
  name: 'index',
  components: {
    'node-filter': NodeFilter,
    'node-tree': NodeTree,
    'node-card': NodeCard
  },
  computed: {
    ...mapGetters('SkillTree', ['nodesUpdated']),
    ...mapState('SkillTree', ['nodes', 'selectedNode'])
  }
})
export default class Index extends Vue {
  public saveCharacter(): void {
    this.$store.dispatch('SkillTree/SAVE_CHARACTER', null);
  }

  public addRootNode(): void {
    this.$store.dispatch('SkillTree/ADD_NODE', null);
  }

  public deleteSelectedNode(): void {
    if (this.$store.state.SkillTree.selectedNode != null) {
      this.$store.dispatch('SkillTree/DELETE_NODE', this.$store.state.SkillTree.selectedNode);
    }
  }
}
</script>

<style lang="scss" scoped>
  .skilltree-view {
    min-width: 900px;

    .navigation {
      display: flex;
      flex-direction: row;
      flex-flow: row-reverse;

      .filter {
        margin-left: auto;
      }
    }

    .menu {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      margin-bottom: 10px;

      > div {
        display: flex;
      }
      .menu-right {
        margin-left: auto;
      }

      .button {
        font-size: 16px;
        padding: 10px;
        background: rgb(27,201,142);
        text-transform: uppercase;
        color: rgb(255,255,255);
        text-decoration: none;

        &.disabled {
          filter: saturate(25%);
          cursor: not-allowed;
        }

        &:not(:first-child) {
          margin-left: 5px;
        }
      }
    }

    .node-card {
      margin-top: 25px;
    }
  }
</style>
