<template>
  <div class="node-tree">
    Node tree
    <node-tree-node />
    <node-tree-node />
    <node-tree-node />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NodeTreeNode from './node-tree-node.vue';

@Component({
  name: 'node-tree',
  components: {
    'node-tree-node': NodeTreeNode
  }
})
export default class NodeTree extends Vue { }
</script>
