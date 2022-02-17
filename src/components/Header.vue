<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const visible = ref(false);
const placement = 'left';
const config = {
  rules: [
    { type: 'object', required: true, message: 'Please select time!' }
  ],
}
function openDrawer() {
  visible.value = true;
  
}
function closeDrawer() {
  visible.value = false;
}
</script>

<template>
  <a-drawer
    title="Basic Drawer"
    :placement="placement"
    :closable="false"
    :visible="visible"
    @close="closeDrawer"
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
  <a-row type="flex" justify="end">
    <a-button type="primary" size="large" shape="circle" @click="openDrawer">
      <CloseOutlined v-if="visible"/>
      <MenuOutlined v-else />
    </a-button>
  </a-row>
</template>

<style scoped>
  
</style>
