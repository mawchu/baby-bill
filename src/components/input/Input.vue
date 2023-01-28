
<template>
  <a-col :sm="span" span="24">
    <a-form-item :label="label" :name="name" has-feedback>
      <a-input v-if="type === 'number'"
        v-model:value.number="inputDatas.numberValue" 
        :placeholder="placeholder" 
        :maxlength="maxlength"
        :prefix="prefix" 
        :suffix="suffix"
        @change="inputSendEmit"></a-input>
      <a-input v-if="type === 'price'"
        v-model:value.number="inputDatas.priceValue" 
        :placeholder="placeholder" 
        :maxlength="maxlength"
        :prefix="prefix" 
        :suffix="suffix"
        @change="inputSendEmit"></a-input>
      <a-input v-if="type === 'text'"
        v-model:value="inputDatas.textValue"
        @change="inputSendEmit">
      </a-input>
      <a-input v-if="type === 'computed'"
        :value.number="inputDatas.computedValue"
        :prefix="prefix" 
        :suffix="suffix"
        @change="inputSendEmit"
        readonly>
      </a-input>
    </a-form-item>
  </a-col>
</template>

<script setup lang="ts">
import { reactive, UnwrapRef, toRaw, ref, computed, watch } from 'vue';
const props = defineProps<{ 
  type: string;
  span: number;
  label: string; 
  name?: string;
  placeholder: string; 
  value?: number;
  maxlength?: number;
  prefix?: string;
  suffix?: string;
  isReset?: boolean; // 偵測resetForm是否被按了
}>()

const emit = defineEmits(['sendInput'])
const inputDatas: any = reactive({
  label: props.label,
  name: props.name,
  numberValue: 1,
  priceValue: 0,
  textValue: '',
  value: '',
  computedValue: computed(() => props.value? props.value : inputDatas[`${props.type}Value`])
})

function inputSendEmit () {
  console.log(props.name+'changed')
  emit('sendInput', {
    name: props.name,
    value: inputDatas[`${props.type}Value`]
  });
}

watch(()=> props.isReset, ()=> {
  const initialValue: any = {
    numberValue: 1,
    priceValue: 0,
    textValue: '',
  }
  inputDatas[`${props.type}Value`] = initialValue[`${props.type}Value`];
})
</script>

<style lang="less" scoped>
</style>
