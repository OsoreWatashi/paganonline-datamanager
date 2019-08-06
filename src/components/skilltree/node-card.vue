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
        <div v-for="(effect, index) in effects" :key="index" class="set">
          <input type="text" :value="effect.text" @input="updateEffect(index, $event)" />
          <a href="javascript:void(0)" class="button" @click="removeEffect(index)">Remove</a>
        </div>
      </div>
      <div class="button-group">
        <a class="button" href="javascript:void(0)" @click="addEffect">Add</a>
      </div>
    </div>
    <div class="group hierarchy">
      <span class="group-header">Hierarchy</span>
      <div class="sets">
        <div class="set">
          <label>Parent</label>
          <a href="javascript:void(0)" class="node-link">Parent node</a>
        </div>
        <div class="set">
          <a href="javascript:void(0)" class="node-link">Child I</a>
          <a href="javascript:void(0)" class="button">Remove</a>
        </div>
        <div class="set">
          <a href="javascript:void(0)" class="node-link">Child II</a>
          <a href="javascript:void(0)" class="button">Remove</a>
        </div>
        <div class="set">
          <a href="javascript:void(0)" class="node-link">Child III</a>
          <a href="javascript:void(0)" class="button">Remove</a>
        </div>
        <div class="set">
          <input type="text" />
          <a href="javascript:void(0)" class="button">Add</a>
        </div>
      </div>
      <div class="button-group">
        <a class="button" href="javascript:void(0)">Add child</a>
        <a class="button" href="javascript:void(0)">Update parent</a>
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
        this.$store.commit('SkillTree/UPDATE_NODE', { node: this.$store.state.SkillTree.selectedNode, property, value });
      }
    };
  }

  return result;
};

@Component({
  name: 'node-card',
  computed: {
    ...bindHelper(['id', 'displayName', 'technicalName', 'type', 'description', 'levelRequirement', 'minimumPoints', 'maximumPoints', 'effects'])
  }
})
export default class NodeCard extends Vue {
  public updateEffect(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;

    this.$store.dispatch('SkillTree/UPDATE_NODE_EFFECTS', { node: this.$store.state.SkillTree.selectedNode, action: 'UPDATE', index, value: { text: input.value } });
  }

  public removeEffect(index: number): void {
    this.$store.dispatch('SkillTree/UPDATE_NODE_EFFECTS', { node: this.$store.state.SkillTree.selectedNode, action: 'REMOVE', index });
  }

  public addEffect(): void {
    this.$store.dispatch('SkillTree/UPDATE_NODE_EFFECTS', { node: this.$store.state.SkillTree.selectedNode, action: 'ADD' });
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

    &::after {
      content: ":";
    }
  }

  .button-group {
    margin-left: auto;
    display: flex;
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
}
</style>
