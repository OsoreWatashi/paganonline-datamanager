<template>
  <div class="node-tree">
    <node-tree-node v-for="node in nodes" :key="node.id" :node="node" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';
import NodeTreeNode from './node-tree-node.vue';

@Component({
  name: 'node-tree',
  components: {
    'node-tree-node': NodeTreeNode
  }
})
export default class NodeTree extends Vue {
  @Prop()
  private nodes!: SkillTree.IViewNode[];
}
</script>

<style lang="scss" scoped>
  .node-tree {
    text-align: left;

    .node-tree {
      margin-left: 20px;
    }
  }
</style>
