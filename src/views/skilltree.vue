<template>
  <div class="skilltree">
    <div class="character-cards">
      <character-card v-for="character in characters" :key="character.technicalName" :character="character"></character-card>
    </div>
    <div class="divider"></div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CharacterCard from '@/components/skilltree/character-card.vue';
import { ICharacter } from '@/types';
import CharacterFactory from '@/factories/skilltree/character-factory';

@Component({
  name: 'skilltree-view',
  components: {
    'character-card': CharacterCard
  }
})
export default class SkilltreeView extends Vue {
  public get characters(): ReadonlyArray<ICharacter> {
    return CharacterFactory.getCharacters();
  }
}
</script>

<style lang="scss" scoped>
  .skilltree {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .character-cards {
      display: flex;
      flex-flow: row wrap;

      .character-card:not(:first-child) {
        margin-left: 10px;
      }
    }

    > .divider {
      box-sizing: border-box;
      width: 500px;
      margin: 25px 0 25px;
      border-bottom: 1px solid rgb(219,191,143);
    }
  }
</style>
