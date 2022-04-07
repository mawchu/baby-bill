<template>
  <Header msg="Hello Vue 3 + TypeScript + Vite" />
  <router-view></router-view>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive, getCurrentInstance, computed } from 'vue'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
// import { useStore } from 'vuex'
// import { key } from './store/store'
// import { mapState, mapGetters, mapMutations, mapActions } from './store/mapStates'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>


