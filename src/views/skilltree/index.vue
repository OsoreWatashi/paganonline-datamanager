<template>
  <div class="skilltree-view">
    <div class="menu">
      <a class="button disabled" href="javascript:void(0)">Add node</a>
      <a class="button" href="javascript:void(0)">Save node</a>
      <a class="button" href="javascript:void(0)">Close node</a>
    </div>

    <node-filter />
    <node-tree />
    <node-card />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import NodeFilter from '@/components/skilltree/node-filter.vue';
import NodeTree from '@/components/skilltree/node-tree.vue';
import NodeCard from '@/components/skilltree/node-card.vue';
import { ICharacter } from '@/types';
import CharacterFactory from '@/factories/skilltree/character-factory';

@Component({
  name: 'index',
  components: {
    'node-filter': NodeFilter,
    'node-tree': NodeTree,
    'node-card': NodeCard
  }
})
export default class Index extends Vue {
}
</script>

<style lang="scss" scoped>
  .skilltree-view {
    min-width: 650px;

    .menu {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      margin-bottom: 10px;

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

        &:first-child {
          margin-left: auto;
        }
        &:not(:first-child) {
          margin-left: 5px;
        }
      }
    }
  }
</style>
