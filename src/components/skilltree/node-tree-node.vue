<template>
  <div class="node-tree-node">
    <div class="display" @click="toggle">
      <span class="toggle">{{node.toggleState}}</span>
      <span class="display-name">{{node.displayName}}</span>
    </div>
    <node-tree v-if="node.children.length > 0 && node.toggleState === '-'" :nodes="node.children"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'node-tree-node',
  components: {
    'node-tree': () => import('./node-tree.vue')
  }
})
export default class NodeTreeNode extends Vue {
  @Prop()
  private node!: SkillTree.IViewNode;

  public toggle(): void {
    this.$store.dispatch('SkillTree/TOGGLE_NODE', this.node);
  }
}
</script>

<style lang="scss" scoped>
  .node-tree-node {
    > .display {
      cursor: pointer;
    }
  }
</style>
