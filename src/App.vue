<template>
  <div class="app">
    <div class="navigation">
      <router-link to="/skilltree">Skilltree</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
  .app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .navigation {
    margin-bottom: 20px;

    a {
      color: rgb(253,253,253);
      font-size: 24px;
      font-weight: bold;
      text-decoration: none;

      &.router-link-active:not(.home), &.router-link-exact-active {
        color: rgb(219,191,143);
        text-decoration: underline;
      }
    }
  }
</style>
