<template>
  <div class="node-tree">
    <node-tree-node v-for="node in nodes" :key="node.id" :node="node" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import NodeTreeNode from './node-tree-node.vue';

@Component({
  name: 'node-tree',
  components: {
    'node-tree-node': NodeTreeNode
  },
  computed: {
    ...mapState('SkillTree', ['nodes'])
  }
})
export default class NodeTree extends Vue { }
</script>

<style lang="scss" scoped>
  .node-tree {
    text-align: left;
  }
</style>
