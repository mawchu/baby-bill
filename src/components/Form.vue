
<template>
  <a-row type="flex" class="h-full" justify="space-around" align="middle">
    <a-col class="w-800">
      <a-typography-title class="text-center">{{ title }} <FormOutlined /></a-typography-title>
      <a-form ref="formRef" :rules="rules" :layout="formState.layout" :model="formState">
        <a-row :gutter="[16]" justify="space-around">
          <a-col :span="12">
            <a-form-item label="日期" name="date">
              <a-date-picker v-model:value="formState.date" style="width: 100%"
                :format="dateFormat" :autofocus="true" :showToday="true" />
            </a-form-item>
            <a-form-item label="商店" name="shop" has-feedback>
              <a-input v-model:value="formState.shop" placeholder="請輸入商店" />
            </a-form-item>
            <a-form-item label="商品" name="item" has-feedback>
              <a-select v-model:value="formState.item" placeholder="請選擇商品類別">
                <a-select-option value="奶粉">奶粉</a-select-option>
                <a-select-option value="尿布">尿布</a-select-option>
                <a-select-option value="玩具">玩具</a-select-option>
                <a-select-option value="衣服">衣服</a-select-option>
                <a-select-option value="保養">保養</a-select-option>
                <a-select-option value="家具">家具</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="廠牌" name="brand" has-feedback>
              <a-input v-model:value="formState.brand" placeholder="請輸入廠牌" />
            </a-form-item>
            <a-form-item label="數量" name="quantity" has-feedback>
              <a-input v-model:value.number="formState.quantity" placeholder="請輸入數量" />
            </a-form-item>
            <a-form-item label="價格"  name="price" has-feedback>
              <a-input v-model:value.number="formState.price" placeholder="請輸入價格" />
            </a-form-item>
          </a-col>
          <a-col :span="24" class="mt-2">
            <a-textarea v-model:value="formState.memo" placeholder="輸入備註" allow-clear showCount :maxlength="100" />
            <a-form-item @click="sendDatas" class="mt-5">
              <a-button type="primary">Submit</a-button>
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
import moment, { Moment } from 'moment';
import { useStore } from 'vuex'
import { key } from '../store'

defineProps<{ title: string }>()

const store = useStore(key)
console.log(store.state.count) // 类型为 number

const emit = defineEmits(['send'])
interface FormState {
  layout: 'horizontal' | 'vertical' | 'inline';
  date: Moment | undefined;
  shop: string;
  item: string;
  brand: string;
  quantity: number;
  price: number;
  memo: string;
}
interface rules {
  date: any;
  shop: any;
  item: any;
  brand: any;
  quantity: any;
  price: any;
}

const dateFormat = 'YYYY/MM/DD';
const today = moment();

const formRef = ref();
const formState: UnwrapRef<FormState> = reactive({
  layout: 'vertical',
  date: undefined,
  shop: '',
  item: '',
  brand: '',
  price: 0,
  quantity: 0,
  memo: ''
});

// 自定義規則
let checkQuantity = async (rule: RuleObject, value: number) => {
  if (!Number.isInteger(value)) {
    return Promise.reject('請輸入數字');
  } else {
    if (value > 100) {
      return Promise.reject('請確認數量是否過大');
    } if (value === 0) {
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
// 驗證規則
const rules: rules = {
  date: [{ required: true, message: '請選擇購買日期', trigger: 'change', type: 'object'}],
  shop: [{ required: true, message: '請輸入商店', trigger: 'blur' }],
  item: [{ required: true, message: '請輸入商品', trigger: 'blur' }],
  brand: [{ required: true, message: '請輸入廠牌', trigger: 'blur' }],
  quantity: [{ required: true, validator: checkQuantity , trigger: 'change' }],
  price: [{ required: true, validator: checkPrice, trigger: 'change' }]
};


function sendDatas () {
  const datas ={
    date: (formState.date)?.format('YYYY/MM/DD'),
    item: formState.item,
    shop: formState.shop,
    price: formState.price,
  };
  
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

// function onChange (dateProxy: any, dateString: string) {
//   console.log(dateProxy, dateString);
// }

</script>

<style lang="less" scoped>
.h {
  &-full{
    height: calc( 100vh - 50px );
  }
}
</style>
