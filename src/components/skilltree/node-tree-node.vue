<template>
  <div class="node-tree-node">
    {{node.displayName}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'node-tree-node'
})
export default class NodeTreeNode extends Vue {
  @Prop()
  private node!: SkillTree.INode;
}
</script>
