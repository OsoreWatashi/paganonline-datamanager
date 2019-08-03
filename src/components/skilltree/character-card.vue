<template>
  <router-link :to="'/skilltree/' + character.technicalName" class="character-card">
    <img :src="require('@/assets/skilltree/' + character.technicalName + '.png')" />
    {{character.displayName}}
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICharacter } from '@/types';

@Component({
  name: 'character-card'
})
export default class CharacterCard extends Vue {
  @Prop()
  private character!: ICharacter;
 }
</script>

<style lang="scss" scoped>
  .character-card {
    display: flex;
    flex-direction: column;
    color: black;
    text-decoration: none;

    > img {
      align-self: center;
      filter: saturate(10%);
    }

    &.router-link-active {
      > img {
        filter: saturate(100%);
      }
    }

    &:not(.router-link-active) {
      > img:hover {
        filter: saturate(33%);
      }
    }
  }
</style>
