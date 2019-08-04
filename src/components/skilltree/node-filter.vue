<template>
  <div class="node-filter">
    <label for>Name</label>
    <input type="text" @input="filterName" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'node-filter'
})
export default class NodeFilter extends Vue {
  public filterName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.$store.dispatch('SkillTree/FILTER_UPDATED', { property: 'name', value: input.value });
  }
}
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
