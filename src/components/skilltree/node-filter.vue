<template>
  <div class="node-filter">
    <label for="">Name</label><input type="text">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'node-filter'
})
export default class NodeFilter extends Vue { }
</script>

<style lang="scss" scoped>
  .node-filter {
    label {
      margin-right: 5px;

      &::after {
        content: ":";
      }
    }
  }
</style>
