<template>
  <div class="node">
    <div class="group name">
      <span class="group-header">Name</span>
      <label for="">Display name</label><input type="text" />
      <label for="">Technical name</label><input type="text" />
    </div>
    <div class="group description">
      <span class="group-header">Description</span>
      <textarea rows="5"></textarea>
    </div>
    <div class="group numbers">
      <span class="group-header">Numbers</span>
      <label for="">Level requirement</label><input type="number" />
      <label for="">Minimum points</label><input type="number" />
      <label for="">Maximum points</label><input type="number" />
    </div>
    <div class="group effects">
      <span class="group-header">Effects</span>
      <div class="sets">
        <div class="set"><input type="text" /><a href="javascript:void(0)" class="button">Remove</a></div>
        <div class="set"><input type="text" /><a href="javascript:void(0)" class="button">Remove</a></div>
        <div class="set"><input type="text" /><a href="javascript:void(0)" class="button">Remove</a></div>
        <div class="set"><input type="text" /><a href="javascript:void(0)" class="button">Remove</a></div>
      </div>
      <a class="button" href="javascript:void(0)">Add</a>
    </div>
    <div class="group children">
      <span class="group-header">Children</span>
      <a class="button" href="javascript:void(0)">Add</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .node {
    display: flex;
    flex-direction: column;
    text-align: left;

    > .group {
      position: relative;
      border: 1px solid rgb(25,25,25);
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
        color: rgb(25,25,25);
        background: rgb(255,255,255);
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

    .button {
      font-size: 16px;
      padding: 10px;
      background: rgb(27,201,142);
      text-transform: uppercase;
      color: rgb(255,255,255);
      text-decoration: none;
      align-self: flex-start;

      margin-left: auto;
    }
  }
</style>
