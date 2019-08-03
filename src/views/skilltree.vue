<template>
  <div class="skilltree">
    <div class="character-cards">
      <character-card v-for="character in characters" :key="character.technicalName" :character="character"></character-card>
    </div>

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
    .character-cards {
      display: flex;
      flex-direction: row;
      justify-content: center;

      .character-card:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
</style>
