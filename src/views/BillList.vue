<template>
  <div class="main mx-auto">
    <div class="mt-6">
      <a-select
      v-model:value="value1"
      style="width: 120px"
    >
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    </div>
    <div>
      <a-table :columns="columns" :data-source="data" class="ma-3">
        <template #name="{ text }">
          <a>{{ text }}</a>
        </template>
        <template #customTitle>
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
        <template #tags="{ text: tags }">
          <span>
            <a-tag
              v-for="tag in tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template #action="{ record }">
          <span>
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive, computed } from 'vue'
import Header from '../components/Header.vue'
import Form from '../components/Form.vue'
import { useStore } from 'vuex'
import { key } from '../store/store'
import { mapState, mapGetters, mapMutations, mapActions } from '../store/mapStates'
import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface';

// mapStates 組合引入寫法
const { loadSheetList, doSheetAction, initSheetValue, insertSheetValue } = mapActions()
const { getSheetList, getSheetListDatas } = mapGetters()
loadSheetList();

const value1 = ref('amy')
const sheetDatas: any = reactive({
  sheetList: computed(() => getSheetList.value.map((sheet: any) => {
    return sheet.properties.title;
  })),
  sheetListDatas: getSheetListDatas
})

// table header
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle', customRender: 'name' },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: { customRender: 'tags' },
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' },
  },
];
// table data
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


</script>

<style>
</style>


