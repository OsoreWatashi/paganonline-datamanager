<template>
  <router-link :to="'/skilltree/' + character.technicalName" class="character-card">
    <img :src="require('@/assets/skilltree/' + character.technicalName + '.png')" />
    {{character.displayName}}
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'character-card'
})
export default class CharacterCard extends Vue {
  @Prop()
  private character!: SkillTree.ICharacter;
 }
</script>

<style lang="scss" scoped>
  .character-card {
    display: flex;
    flex-direction: column;
    color: rgb(253,253,253);;
    text-decoration: none;

    > img {
      align-self: center;
      filter: saturate(10%);
      margin-bottom: 5px;
    }

    &.router-link-active {
      color: rgb(219,191,143);

      > img {
        filter: saturate(100%) drop-shadow(0 0 20px rgba(219,191,143,0.5));
      }
    }

    &:not(.router-link-active) {
      > img:hover {
        filter: saturate(33%)  drop-shadow(0 0 20px rgba(219,191,143,0.25));
      }
    }
  }
</style>
