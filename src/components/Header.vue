<template>
  <a-drawer
    title="寶寶花費記帳小工具"
    :style="{textAlign: 'center'}"
    :placement="placement"
    :closable="false"
    :visible="visible"
    @close="closeDrawer"
  >
    <template v-if="!login.value" class="d-flex justify-center">
      <a-button type="primary" shape="round" danger @click="googleAuth">
        <template #icon>
          <GoogleOutlined />
          第三方登入
        </template>
      </a-button>
    </template>
    <template v-if="login.value">
      <a-avatar
        :size="100"
        :src="userAvatar.value">
      </a-avatar>
      <div class="mt-2">
        <strong class="router-link pb-0 py-3">
          Hi, {{ userName.value }}
        </strong>
      </div>
      <div class="py-6">
        <p class="router-link">
          <router-link to="/createBill">建立新花費</router-link>
        </p>
        <p class="router-link mb-0">
          <router-link to="/billList">花費清單</router-link>
        </p>
      </div>
      <a-button type="primary" shape="round" danger @click="googleLogout">
        <template #icon>
          <LogoutOutlined />
          登出帳號
        </template>
      </a-button>
    </template>

  </a-drawer>
  <a-row type="flex" justify="end" class="fixed header pointer-events-none">
    <a-button type="primary" size="large" shape="circle" @click="openDrawer" class="pointer-events-auto">
      <CloseOutlined v-if="visible"/>
      <MenuOutlined v-else />
    </a-button>
  </a-row>
</template>
<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from '../store/mapStates'

defineProps<{ msg: string }>()

const { googleAuthGetCode, googleAuthGetUserInfo, googleAuthSetCookie, googleAuthRemoveCookie } = mapActions()
const { getLogin, getUserName, getUserAvatar, getUserEmail } = mapGetters()

if(location.search) {
  const params = new URLSearchParams(location.search);
  const authCode = params.get("code");
  googleAuthGetUserInfo(authCode)
}

googleAuthSetCookie();
const login = computed(() => getLogin );
const userName = computed(() => getUserName );
const userEmail = computed(() => getUserEmail );
const userAvatar = computed(() => getUserAvatar );
const visible = ref(false);
const placement = 'left';
const config = {
  rules: [
    { type: 'object', required: true, message: 'Please select time!' }
  ],
}

function googleAuth() {
  googleAuthGetCode();
}

function googleLogout() {
  setTimeout(() => {
    googleAuthRemoveCookie();
  }, 1000)
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
