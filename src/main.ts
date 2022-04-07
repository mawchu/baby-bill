import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from "./libs/antdv"
import * as Icons from '@ant-design/icons-vue';
import { router } from './router'
import { store, key } from './store/store';
import Axios from 'axios'
import './interface/interface';

const app = createApp(App);
const icons :any = Icons;
// 安裝 vue-router 外掛
app.use(router)
app.use(store, key)
setupAntd(app); 
createApp(App);
app.config.globalProperties.$axios = Axios;

// 父組件全局註冊ICONS
for(const i in icons) {
  app.component(i, Icons[i]);
}

app.mount('#app')
