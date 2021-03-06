<template>
  <div class="node">
    <div class="group name">
      <span class="group-header">Name</span>
      <label for>ID</label>
      <input type="number" v-model="id" />
      <label for>Display name</label>
      <input type="text" v-model="displayName" />
      <label for>Technical name</label>
      <input type="text" v-model="technicalName" />
      <label for>Type</label>
      <select v-model="type">
        <option>Ability</option>
        <option>Major</option>
        <option>Minor</option>
      </select>
    </div>
    <div class="group description">
      <span class="group-header">Description</span>
      <textarea rows="5" v-model="description"></textarea>
    </div>
    <div class="group numbers">
      <span class="group-header">Numbers</span>
      <label for>Level requirement</label>
      <input type="number" v-model="levelRequirement" />
      <label for>Minimum points</label>
      <input type="number" v-model="minimumPoints" />
      <label for>Maximum points</label>
      <input type="number" v-model="maximumPoints" />
    </div>
    <div class="group effects">
      <span class="group-header">Effects</span>
      <div class="sets">
        <div v-for="effect in filteredEffects()" :key="effect.sequence" class="set">
          <input type="text" :value="effect.description" @input="updateEffect(effect, $event)" />
          <a href="javascript:void(0)" class="button" @click="removeEffect(effect)">Remove</a>
        </div>
      </div>
      <div class="button-group">
        <ul v-if="maximumPoints > 1" class="levels">
          <li v-for="level in maximumPoints" :key=level>
            <input type="radio" name="ability-level" :value="level" v-model="selectedLevel" /><label class="no-colon">Level {{level}}</label>
          </li>
        </ul>
        <a class="button" href="javascript:void(0)" @click="addEffect">Add</a>
      </div>
    </div>
    <div class="group hierarchy">
      <span class="group-header">Hierarchy</span>
      <div class="sets">
        <div class="set" v-if="parent != null">
          <label>Parent</label>
          <router-link :to="'/skilltree/' + $router.currentRoute.params.char + '/' + parent.id">{{parent.displayName}}</router-link>
        </div>
        <div v-for="child in children.filter((x) => x.isDeleted !== true)" :key="child.id" class="set">
          <router-link :to="'/skilltree/' + $router.currentRoute.params.char + '/' + child.id">{{child.displayName}}</router-link>
          <a href="javascript:void(0)" class="button" @click="deleteChild(child)">Delete</a>
        </div>
      </div>
      <div class="button-group">
        <a class="button" href="javascript:void(0)" @click="addChild">Add</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Store, Computed } from 'vuex';
import { Dictionary } from 'vue-router/types/router';

const bindHelper = (properties: string[]): Dictionary<Computed> => {
  const result: any = {};
  for (const property of properties) {
    result[property] = {
      get() {
        return this.$store.state.SkillTree.selectedNode[property];
      }, set(value: any) {
        if (['id', 'levelRequirement', 'minimumPoints', 'maximumPoints'].some((x) => x === property)) {
          const parsedValue = parseInt(value, 10);
          this.$store.commit('SkillTree/UPDATE_NODE', { node: this.$store.state.SkillTree.selectedNode, property, value: parsedValue });
        } else {
          this.$store.commit('SkillTree/UPDATE_NODE', { node: this.$store.state.SkillTree.selectedNode, property, value });
        }
      }
    };
  }

  return result;
};

@Component({
  name: 'node-card',
  computed: {
    ...bindHelper(['id', 'displayName', 'technicalName', 'type', 'description', 'levelRequirement', 'minimumPoints', 'maximumPoints', 'effects', 'children', 'parent'])
  }
})
export default class NodeCard extends Vue {
  private selectedLevel: number = 1;

  public filteredEffects(): SkillTree.IEffect[] {
    const effects: SkillTree.IEffect[] = this.$store.state.SkillTree.selectedNode.effects;
    if (effects == null || effects.length < 1) {
      return effects;
    }

    const filteredEffects = effects.filter((x) => x.level === this.selectedLevel && x.isDeleted !== true);
    return filteredEffects;
  }

  public updateEffect(effect: SkillTree.IEffect, event: Event): void {
    const input = event.target as HTMLInputElement;
    effect.description = input.value;

    this.$store.dispatch('SkillTree/UPDATE_NODE_EFFECTS', { node: this.$store.state.SkillTree.selectedNode, action: 'UPDATE', effect });
  }

  public removeEffect(effect: SkillTree.IEffect): void {
    this.$store.dispatch('SkillTree/UPDATE_NODE_EFFECTS', { node: this.$store.state.SkillTree.selectedNode, action: 'REMOVE', effect });
  }

  public addEffect(): void {
    this.$store.dispatch('SkillTree/UPDATE_NODE_EFFECTS', { node: this.$store.state.SkillTree.selectedNode, action: 'ADD', level: this.selectedLevel });
  }

  public deleteChild(child: SkillTree.IViewNode) {
    this.$store.dispatch('SkillTree/DELETE_NODE', child);
  }

  public addChild() {
    this.$store.dispatch('SkillTree/ADD_NODE', this.$store.state.SkillTree.selectedNode );
  }
}
</script>

<style lang="scss" scoped>
.node {
  display: flex;
  flex-direction: column;
  text-align: left;

  > .group {
    position: relative;
    border: 1px solid rgba(253, 253, 253, 0.5);
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: row;

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    > .group-header {
      position: absolute;
      top: -10px;
      left: 7px;
      color: rgb(219, 191, 143);
      background: rgb(23, 33, 39);
      padding: 0 5px 0 5px;
    }

    > .sets {
      display: flex;
      flex-direction: column;

      > .set:not(:first-child) {
        margin-top: 5px;
      }

      .button {
        display: inline-flex;
        margin-left: 10px;
      }
    }

    &.description {
      > textarea {
        width: 100%;
      }
    }

    &.effects {
      input {
        width: 500px;
      }
    }
  }

  label {
    margin-right: 5px;

    &:not(:first-child) {
      margin-left: 10px;
    }

    &:not(.no-colon)::after {
      content: ":";
    }
  }

  .button-group {
    margin-left: auto;
    display: flex;

    .levels {
      list-style: none;
      margin: 0 10px 0 0;
      
      input {
        width: auto;
      }
    }
  }

  .button {
    font-size: 16px;
    padding: 10px;
    background: rgb(27, 201, 142);
    text-transform: uppercase;
    color: rgb(255, 255, 255);
    text-decoration: none;
    align-self: flex-start;

    &:not(:first-child) {
      margin-left: 5px;
    }
  }

  a {
    color: rgb(253,253,253);
    text-decoration: none;
  }
}
</style>
