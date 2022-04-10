<template>
  <Form title="寶寶花費紀錄" @send="send" @sendInput="sendInput" @sendDate="sendDate"/>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive, getCurrentInstance, computed } from 'vue'
import Header from '../components/Header.vue'
import Form from '../components/Form.vue'
import { useStore } from 'vuex'
import { key } from '../store/store'
import { mapState, mapGetters, mapMutations, mapActions } from '../store/mapStates'
// mapStates 組合引入寫法
const { loadSheetList, doSheetAction, initSheetValue, insertSheetValue } = mapActions()
const { getSheetList, getSheetListDatas } = mapGetters()

// 舊的寫法
// const store = useStore(key)
// console.log(store.state.count) 

loadSheetList();
// 元件裡使用全局套件的方法 例如 axios
const currentInstance = getCurrentInstance();
if(currentInstance != null) {
  const { $axios } = currentInstance.appContext.config.globalProperties
}

const datas: any = reactive({
  // 取得現有的 google 表單月份
  sheetList: computed(() => getSheetList.value.map((sheet: any) => {
    return sheet.properties.title;
  })),
  // 取得現有的 google 表單 id, index 列表
  sheetListDatas: getSheetListDatas,
  newSheetId: computed(() => datas.sheetListDatas[datas.sheetListDatas.length-1]['sheetId']+1),
  // 要更新的月份表單 title
  updateMonth: computed(() => datas.date? datas.date.split('/').join('').substr(0, 6) : ''),
  date: undefined,
  shop: '',
  name: '',
  item: '',
  brand: '',
  price: 0,
  singlePrice: 0,
  quantity: 0,
  memo: ''
});
// 是否需要新增表單
const needNewSheet = ref(false)

function send (formDatas: any) {
  console.log(formDatas)
  let formatDatas = { ...formDatas }
  formatDatas.date = (formDatas.date)?.format('YYYY/MM/DD')
  datas.date = formatDatas.date;
  datas.shop = formatDatas.shop;
  datas.name = formatDatas.name;
  datas.item = formatDatas.item;
  datas.brand = formatDatas.brand;
  datas.price = formatDatas.total;
  datas.singlePrice = formatDatas.singlePrice.value;
  datas.groupNumber = formatDatas.groupNumber;
  datas.quantity = formatDatas.quantity;
  datas.memo = formatDatas.memo;
  compareSheetMonth ();
  // 新的月份
  if (needNewSheet.value) {
    createNewSheet()
  } else {
    // 舊的月份
    appendOldSheet()
  }
}

function sendDate (datas: any) {
  console.log('app', datas)
}
function sendInput (datas: any) {
  console.log('app', datas)
}
async function createNewSheet () {
  await doSheetAction({...datas});
  await initSheetValue({
    ...datas,
    values: [
      ['', '日期', '商店', '品牌', '商品名稱', '商品類別', '單位', '小單位', '平均單價', '總額'],
      [
        '內容', 
        datas.date, 
        datas.shop, 
        datas.brand, 
        datas.name, 
        datas.item, 
        datas.groupNumber, 
        datas.quantity, 
        datas.singlePrice,
        datas.price
      ],
      ['備註', datas.memo]
    ],
  })
}

async function appendOldSheet () {
  await insertSheetValue({
    ...datas,
    values: [
      [
        '內容', 
        datas.date, 
        datas.shop, 
        datas.brand, 
        datas.name, 
        datas.item, 
        datas.groupNumber, 
        datas.quantity, 
        datas.singlePrice,
        datas.price
      ],
      ['備註', datas.memo]
    ]
  })
  await loadSheetList();
}

// 是否要新增新的月份表單
function compareSheetMonth () {
  needNewSheet.value = !datas.sheetList.some((sheet: any) => {
    return sheet === datas.updateMonth;
  })
}

</script>

<style>
</style>


