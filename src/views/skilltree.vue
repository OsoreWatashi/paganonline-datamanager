<template>
  <div class="skilltree">
    <div v-if="$route.params.character == null">
      <span>Select a character to manage.</span>
      <router-link to="/skilltree/anya">Anya</router-link>

      <router-view></router-view>
    </div>
  </div>
</template>
