
<template>
  <a-row type="flex" class="h-full p-3" justify="space-around" align="middle">
    <a-col class="w-800 bg-light-grey rounded-3 p-6">
      <a-typography-title class="text-center mb-2">
        {{ title }} <FormOutlined />
      </a-typography-title>
      <hr class="mb-3">
      <a-form
        ref="formRef"
        :rules="rules"
        :model="formState"
        :layout="formState.layout">
        <a-row :gutter="16" justify="center">
          <DatepickerInput
            :span="18"
            :isReset="isReset"
            label="購買日期"
            name="date"
            :dateFormat="dateFormat"
            @sendDate="sendDate"/>
        </a-row>
        <a-row :gutter="16" justify="space-around">
          <Input
            :span="12"
            :isReset="isReset"
            type="text"
            label="商店"
            name="shop"
            placeholder="請輸入商店"
            @sendInput="sendInput"/>
          <Input
            :span="12"
            :isReset="isReset"
            type="text"
            label="品牌"
            name="brand"
            placeholder="請輸入品牌"
            @sendInput="sendInput" />
        </a-row>
        <a-row :gutter="16" justify="space-around">
          <Input
            :span="12"
            :isReset="isReset"
            type="text"
            label="商品名稱"
            name="name"
            placeholder="請輸入商品名稱"
            @sendInput="sendInput"/>
          <SelectInput
            :span="12"
            :isReset="isReset"
            label="選擇商品類別"
            name="item"
            placeholder="請選擇商品類別"
            :options="options"
            @sendSelect="sendSelect" /> 
        </a-row>
        <a-row :gutter="16" justify="space-around">
          <a-col :span="4">
            <a-typography-text class="hint bold">顯示小單位</a-typography-text><br>
            <a-switch class="mt-3" v-model:checked="showUnit" />
          </a-col>
          <Input 
            :span="showUnit? 10: 20"
            :isReset="isReset"
            type="number" 
            :label="showUnit? '購買大單位數(ex.一包尿布)' : '購買數量'"
            name="groupNumber" 
            placeholder="請輸入數量"
            @sendInput="sendInput"/>
          <Input
            v-show="showUnit"
            :isReset="isReset"
            :span="10"
            type="number"
            label="購買小單位數(ex.30片)"
            name="quantity"
            placeholder="請輸入數量"
            @sendInput="sendInput" />
        </a-row>
        <a-row :gutter="16" justify="space-around">
          <Input
            :span="12"
            :isReset="isReset"
            type="price"
            label="購買價格"
            name="total"
            placeholder="請輸入價格"
            prefix="$"
            suffix="NTD"
            @sendInput="sendInput"/>
          <Input
            :span="12" 
            :value="formState.singlePrice"
            type="computed" 
            label="平均單價(自動計算)" 
            placeholder="自動計算" 
            prefix="$" 
            suffix="NTD"
            @sendInput="sendInput"/>
        </a-row>
        <a-row :gutter="16" justify="space-around">
          <a-col :span="24" class="mt-2">
            <a-textarea
              v-model:value="formState.memo"
              placeholder="輸入備註"
              allow-clear
              showCount
              :maxlength="100" />
            <a-form-item @click="sendDatas" class="mb-0">
              <a-button type="primary">提交消費</a-button>
              <a-button style="margin-left: 10px"
                @click="resetForm">
                重填
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { computed, defineComponent, reactive, UnwrapRef, toRaw, ref } from 'vue';
import moment from 'moment';
import type { FormState, FormRules, InputState } from '../interface/interface'
import Input from './input/Input.vue'
import SelectInput from './input/SelectInput.vue'
import DatepickerInput from './input/DatepickerInput.vue'
import { selections } from '../utility/globalData';

const props = defineProps<{ title: string }>()
const emit = defineEmits(['send', 'sendInput', 'sendDate', 'sendSelect'])

const dateFormat = 'YYYY/MM/DD';
const today = moment()
const isReset = ref(false)
const showUnit = ref(false)
const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  layout: 'vertical',
  date: undefined,
  shop: '',
  name: '',
  item: '',
  brand: '',
  groupNumber: 1,
  quantity: 1,
  price: 0,
  singlePrice: computed(()=> Number((formState.total / (formState.groupNumber * formState.quantity)).toFixed(1))),
  total: 0,
  memo: '',
  region: ''
});
const options = selections;

// 自定義規則
let checkQuantity = async (rule: RuleObject, value: number) => {
  if (!Number.isInteger(value)) {
    return Promise.reject('請輸入數字');
  } else {
    if (value > 1000) {
      return Promise.reject('請確認數量是否過大');
    } else if (value === 0) {
      return Promise.reject('請輸入數量');
    } else {
      return Promise.resolve();
    }
  }
};
let checkPrice = async (rule: RuleObject, value: number) => {
  if (!Number.isInteger(value)) {
    return Promise.reject('請輸入數字');
  } else {
    if (value === 0) {
      return Promise.reject('請輸入價格');
    } else {
      return Promise.resolve();
    }
  }
};

let checkSelect = async (rule: RuleObject, value: number) => {
  if (!value) {
    return Promise.reject('請選擇商品類別');
  } else {
    return Promise.resolve()
  }
};
// 驗證規則
const rules: FormRules = {
  date: [{
    required: true,
    message: '請選擇購買日期',
    trigger: 'change',
    type: 'object'
  }],
  shop: [{
    required: true,
    message: '請輸入商店',
    trigger: 'blur'
  }],
  name: [{
    required: true,
    validator: checkSelect,
    trigger: 'blur'
  }],
  item: [{
    required: true,
    validator: checkSelect,
    trigger: 'blur'
  }],
  brand: [{
    required: true,
    message: '請輸入廠牌',
    trigger: 'blur'
  }],
  groupNumber: [{
    required: true,
    validator: checkQuantity,
    trigger: 'change'
  }],
  quantity: [{
    required: true,
    validator: checkQuantity,
    trigger: 'change'
  }],
  singlePrice: [{
    required: false,
    validator: checkPrice,
    trigger: 'change'
  }],
  price: [{
    required: true,
    validator: checkPrice,
    trigger: 'change'
  }],
  total: [{
    required: true,
    validator: checkPrice,
    trigger: 'change'
  }]
};

function sendDatas () {
  formRef.value
    .validate()
    .then(() => {
      // 都有填
      console.log('values', formState, toRaw(formState));
      emit('send', toRaw(formState));
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      // 有地方沒填
      console.log('error', error);
    });
}

const resetForm = () => {
  formRef.value.resetFields();
  isReset.value = !isReset.value;
};

function sendInput (datas: InputState) {
  formState[datas.name] = datas.value;
  emit('sendInput', datas.value);
}

function sendDate (data: any) {
  formState.date = data;
  emit('sendDate', data);
}

function sendSelect (data: any) {
  formState.item = getSelectionsChinese(data.value);
  emit('sendSelect', data);
}

</script>

<style lang="less" scoped>
button.mt-3 {
  margin-top: 10px;
}
</style>
