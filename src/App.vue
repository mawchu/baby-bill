<template>
  <Header msg="Hello Vue 3 + TypeScript + Vite" />
  <Form title="寶寶花費紀錄" @send="send" @sendInput="sendInput" @sendDate="sendDate"/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive, getCurrentInstance, computed } from 'vue'
import Header from './components/Header.vue'
import Form from './components/Form.vue'
import { useStore } from 'vuex'
import { key } from './store/store'
import { mapState, mapGetters, mapMutations, mapActions } from './store/mapStates'
// mapStates 組合引入寫法
const { loadSheetList, doSheetAction, initSheetValue } = mapActions()
const { getSheetList, getSheetListDatas } = mapGetters()

// 舊的寫法
// const store = useStore(key)
// console.log(store.state.count) 

loadSheetList();
// 元件裡使用全局套件的方法 例如 axios
const currentInstance = getCurrentInstance();
if(currentInstance != null) {
  const { $axios } = currentInstance.appContext.config.globalProperties
  // $axios.post('http://localhost:5500/google/addSheet', { data: '一些資料' })
  //   .then((res: any) => { console.table('post res', res.data) })
  //   .catch((err: any) => { console.log(err) })
}

const datas: any = reactive({
  // 取得現有的 google 表單月份
  sheetList: computed(() => getSheetList.value.map((sheet: any) => {
    return sheet.properties.title;
  })),
  // 取得現有的 google 表單 id, index 列表
  sheetListDatas: getSheetListDatas,
  newSheetId: computed(() => datas.sheetListDatas[datas.sheetListDatas.length-1]['sheetId'] + 1),
  // 要更新的月份表單 title
  updateMonth: computed(() => datas.date? datas.date.split('/').join('').substr(0, 6) : ''),
  date: undefined,
  shop: '',
  name: '',
  item: '',
  brand: '',
  price: 0,
  quantity: 0,
  memo: ''
});
// 是否需要新增表單
const needNewSheet = ref(false)

function send (formDatas: any) {
  for(const key in formDatas) {
    console.log(key, formDatas[key])
  }
  let formatDatas = { ...formDatas }
  formatDatas.date = (formDatas.date)?.format('YYYY/MM/DD')
  datas.date = formatDatas.date;
  datas.shop = formatDatas.shop;
  datas.name = formatDatas.name;
  datas.item = formatDatas.item;
  datas.brand = formatDatas.brand;
  datas.price = formatDatas.price;
  datas.groupNumber = formatDatas.groupNumber;
  datas.quantity = formatDatas.quantity;
  datas.memo = formatDatas.memo;
  compareSheetMonth ();
  if (needNewSheet.value) {
  //  createNewSheet()
  }
}

function sendDate (datas: any) {
  console.log('app', datas)
}
function sendInput (datas: any) {
  console.log('app', datas)
}
async function createNewSheet () {
  // 新增工作表
  await doSheetAction({
    ...datas,
    action: 'addSheet'
  });
  // 寫入第一筆內容
  await initSheetValue({
    ...datas,
    values: [
      ['', '日期', '商店', '廠牌', '組數(包/組/套)', '個數(片/個/張)', '商品名', '單價', '總額'],
      ['內容', datas.date, datas.shop, datas.brand, datas.groupNumber, datas.quantity, datas.price],
      ['備註', datas.memo]
    ],
  })
}

// 是否要新增新的月份表單
function compareSheetMonth () {
  needNewSheet.value = !datas.sheetList.some((sheet: any) => {
    return sheet === datas.updateMonth;
  })
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}
</style>


