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

@Component({
  name: 'skilltree-view',
  components: {
    'character-card': CharacterCard
  }
})
export default class SkilltreeView extends Vue {
  public get characters(): ICharacter[] {
    return [
      { displayName: 'Anya', technicalName: 'anya' },
      { displayName: 'Dameer', technicalName: 'dameer' },
      { displayName: 'Istok', technicalName: 'istok' },
      { displayName: 'Kingewitch', technicalName: 'kingewitch' },
      { displayName: 'Lukian', technicalName: 'lukian' },
      { displayName: 'Marokh', technicalName: 'marokh' },
      { displayName: 'Masha', technicalName: 'masha' },
      { displayName: 'Valeria', technicalName: 'valeria' }];
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
