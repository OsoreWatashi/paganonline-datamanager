<template>
  <div class="skilltree-view">
    <div class="menu">
      <a class="button" href="javascript:void(0)">Add skill</a>
    </div>
    <node/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Node from '@/components/skilltree/node.vue';
import { ICharacter } from '@/types';
import CharacterFactory from '@/factories/skilltree/character-factory';

@Component({
  name: 'index',
  components: {
    Node
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

      .button {
        font-size: 16px;
        padding: 10px;
        background: rgb(27,201,142);
        text-transform: uppercase;
        color: rgb(255,255,255);
        text-decoration: none;

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
