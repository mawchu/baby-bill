
<template>
  <a-col :sm="span" span="24">
    <a-form-item :label="label" :name="name" has-feedback>
      <a-select v-model:value="selectDatas.value" placeholder="請選擇商品類別" @select="sendSelectEmit">
        <a-select-option v-for="(option, key, index) in options" :value="option.value" :key="key">
          {{ getSelectionsChinese(option.value) }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-col>
</template>

<script setup lang="ts">
import { reactive, watch, UnwrapRef, toRaw, ref } from 'vue';
import { getSelectionsChinese } from '../../utility/globalData';
const props = defineProps<{ 
  span: number, 
  label: string, 
  name: string, 
  placeholder: string, 
  options: any,
  isReset?: boolean; // 偵測resetForm是否被按了
}>()

const emit = defineEmits(['sendSelect'])
const selectDatas = reactive({
  label: props.label,
  name: props.name,
  value: ''
})

function sendSelectEmit () {
  emit('sendSelect', toRaw(selectDatas));
}

watch(()=> props.isReset, ()=> {
  selectDatas.value = ''
})

</script>

<style lang="less" scoped>
</style>
