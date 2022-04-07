<template>
  <a-drawer
    title="寶寶花費記帳小工具"
    :placement="placement"
    :closable="false"
    :visible="visible"
    @close="closeDrawer"
  >
    <p class="router-link">
      <router-link to="/createBill">建立新花費</router-link>
    </p>
    <p class="router-link">
      <router-link to="/billList">花費清單</router-link>
    </p>
  </a-drawer>
  <a-row type="flex" justify="end" class="fixed header pointer-events-none">
    <a-button type="primary" size="large" shape="circle" @click="openDrawer" class="pointer-events-auto">
      <CloseOutlined v-if="visible"/>
      <MenuOutlined v-else />
    </a-button>
  </a-row>
</template>
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
<style lang="less" scoped>
  .pointer-events {
    &-none {
      pointer-events: none;
    }
    &-auto {
      pointer-events: auto;
    }
  }
</style>
