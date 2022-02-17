import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from "./libs/antdv"; // 新增++
import * as Icons from '@ant-design/icons-vue';
import { store, key } from './store'
import Axios from 'axios'

const app = createApp(App);
const icons :any = Icons;
app.use(store, key)
setupAntd(app); 
createApp(App);
app.config.globalProperties.$axios = Axios;

// 父組件全局註冊ICONS
for(const i in icons) {
  app.component(i, Icons[i]);
}

app.mount('#app')
