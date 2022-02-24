
<template>
  <a-col :span="span">
    <a-form-item :label="label" :name="name" has-feedback>
      <a-select v-model:value="selectDatas.value" placeholder="請選擇商品類別" @select="sendSelectEmit">
        <a-select-option v-for="(option, key, index) in options" :value="index" :key="key">
          {{ option.item }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-col>
</template>

<script setup lang="ts">
import { reactive, UnwrapRef, toRaw, ref } from 'vue';
const props = defineProps<{ span: number, label: string, name: string, placeholder: string, options: any }>()

const emit = defineEmits(['sendSelect'])
const selectDatas = reactive({
  label: props.label,
  name: props.name,
  value: ''
})

function sendSelectEmit () {
  emit('sendSelect', toRaw(selectDatas));
}

</script>

<style lang="less" scoped>
</style>
