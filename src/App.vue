<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive, getCurrentInstance } from 'vue'
import Header from './components/Header.vue'
import Form from './components/Form.vue'

const currentInstance = getCurrentInstance();
if(currentInstance != null) {
  const { $axios } = currentInstance.appContext.config.globalProperties
  // $axios.get('https://sheets.googleapis.com/v4/spreadsheets/19GMzzbUQpx1MZQd7K2dsmHtJmd9XeL2M3Lzb1l2yJX8/values/工作表1?key=AIzaSyB8-84OALlzg5anFTN07wzn2cw2S_Qp9jM')
  //   .then((res) => { console.table(res.data) })

  $axios.get('https://sheets.googleapis.com/v4/spreadsheets/19GMzzbUQpx1MZQd7K2dsmHtJmd9XeL2M3Lzb1l2yJX8?key=AIzaSyB8-84OALlzg5anFTN07wzn2cw2S_Qp9jM')
    .then((res: any) => { console.table(res.data) })

  // $axios.post('http://localhost:5500/addSheet', { data: '一些資料' })
  //   .then((res: any) => { console.table(res.data) })
  //   .catch((err: any) => { console.log(err) })
}


const send = (e: any) => {
    console.log('获取内容==>', e);
}

</script>

<template>
  <Header msg="Hello Vue 3 + TypeScript + Vite" />
  <Form title="寶寶花費紀錄" @send="send"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 10px;
  height: 100vh;
}
</style>
