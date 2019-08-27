<template>
  <div class="node-tree-node" :class="[selectedNode != null && selectedNode.id === node.id ? 'selected' : '', node.matchFilter !== true ? 'filtered' : '']">
    <div class="display">
      <fontawesome :icon="toggleState" class="toggler" @click="toggle" />
      <span class="display-name" @click="select">{{node.displayName}}</span>
    </div>
    <node-tree v-if="node.children.length > 0 && node.toggleState === '-'" :nodes="node.children.filter((x) => x.isDeleted !== true)"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

@Component({
  name: 'node-tree-node',
  components: {
    'node-tree': () => import('./node-tree.vue'),
    'fontawesome': FontAwesomeIcon
  }, computed: {
    ...mapState('SkillTree', ['selectedNode']),
  }
})
export default class NodeTreeNode extends Vue {
  @Prop()
  private node!: SkillTree.IViewNode;

  public get toggleState(): string {
    switch (this.node.toggleState) {
      case '+': return 'plus-circle';
      case '-': return 'minus-circle';

      case ' ':
      default:
        return 'stop-circle';
    }
  }

  public select(): void {
    this.$store.dispatch('SkillTree/SELECT_NODE', this.node);
  }

  public toggle(): void {
    this.$store.dispatch('SkillTree/TOGGLE_NODE', this.node);
  }
}
</script>

<style lang="scss" scoped>
  .node-tree-node {
    > .display {
      cursor: pointer;

      > .toggler {
        margin-right: 5px;

        &.fa-stop-circle {
          opacity: 0.5;
        }
      }
    }

    &.selected > .display > .display-name {
      color: rgb(219,191,143);
    }

    &.filtered {
      display: none;
    }
  }
</style>
