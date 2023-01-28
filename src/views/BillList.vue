<template>
  <div class="main mx-auto mt-10">
    <div class="mt-6 mx-3">
      <a-select
        v-model:value="selectSheet"
        style="width: 120px"
      >
      <a-select-option
        v-for="(item, index) in getSheetListDatas"
        :key="index"
        :value="item.title">
        {{ item.title }}
      </a-select-option>
    </a-select>
    </div>
    <div class="wrapper overflow-hidden w-100">
      <a-table
        :columns="columns"
        :data-source="data"
        class="ma-3">
        <template #tags="{ text: tags }">
          <span>
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tagColor(tag)"
            >
              {{ tag }}
            </a-tag>
          </span>
        </template>
        <template #expandedRowRender="{ record }">
          <p style="margin: 0">
            {{ record.description }}
          </p>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive, computed, watch } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from '../store/mapStates'
import { groupBy, map, forEach, flatten } from 'lodash-es';

// mapStates 組合引入寫法
const { loadSheetList, loadSheetValue, doSheetAction, initSheetValue, insertSheetValue } = mapActions()
const { getSheetList, getSheetListDatas } = mapGetters()
loadSheetList('');

const selectSheet = ref('請選擇')
const sheetDatas: any = reactive({
  sheetList: computed(() => getSheetList.value.map((sheet: any) => {
    return sheet.properties.title;
  })),
  sheetListDatas: getSheetListDatas
})
const sheetContent: any = reactive({value: []});
const tagColor = (tag: string) => {
  const colors: any = {
    0: 'volcano',
    1: 'gold',
    2: 'cyan',
    3: 'geekblue',
    4: 'purple',
    5: 'magenta',
    6: 'magenta',
    7: 'magenta'
  }
  return colors[tag];
};

// table header
const columns = [
  {
    key: 'date',
    title: '日期',
    dataIndex: 'date',
  },
  {
    key: 'shop',
    title: '商店',
    dataIndex: 'shop',
  },
  {
    key: 'brand',
    title: '品牌',
    dataIndex: 'brand',
  },
  {
    dataIndex: 'product',
    title: '商品名稱',
    key: 'product',
    width: 200
  },
  {
    key: 'type',
    title: '商品類別',
    dataIndex: 'type',
    slots: { customRender: 'tags' },
  },
  {
    key: 'unit',
    title: '單位',
    dataIndex: 'unit',
    align: 'right'
  },
  {
    key: 'singleUnit',
    title: '小單位',
    dataIndex: 'singleUnit',
    align: 'right'
  },
  {
    key: 'unitPrice',
    title: '平均單價',
    dataIndex: 'unitPrice',
    align: 'right'
  },
  {
    key: 'total',
    title: '總額',
    dataIndex: 'total',
    align: 'right'
  }
];
// table data
let data: any = reactive([]);


watch(selectSheet, (newValue, oldValue) => {
  data.splice(0);
  sheetContent.value.splice(0);
  loadSheetValue(selectSheet.value)
    .then((res: any) => {
      forEach(res, (item: any, index: any) => {
        if(index % 2 === 1) {
          sheetContent.value.push(flatten(res.splice(0, 2)));
        }
      })
    })
})

watch(sheetContent, (newValue, oldValue) => {
  if(sheetContent.value.length) {
    forEach(sheetContent.value, (content: any, index: number) => {
      data.push({
        key: index,
        date: content[1],
        shop: content[2],
        brand: content[3],
        product: content[4],
        type: [content[5]],
        unit: content[6],
        singleUnit: content[7],
        unitPrice: content[8],
        total: content[9],
        description: content[11],
      })
    })
    console.log(data)
  }
})

</script>

<style scoped>
.wrapper {
  @media screen and (max-width:760px) {
    overflow-x: scroll;
  }
}
th {
  min-width: 120px;
}
</style>


