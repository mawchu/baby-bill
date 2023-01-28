
<template>
  <a-col :sm="span" span="24">
    <a-form-item :label="label" :name="name">
      <a-date-picker v-model:value="dateDatas.value" style="width: 100%"
        :format="dateFormat" :autofocus="true" :showToday="true" 
        @change="sendDatepickerEmit" />
    </a-form-item>
  </a-col>
</template>

<script setup lang="ts">
import { computed, watch, reactive, toRaw, UnwrapRef } from 'vue';
import type { DateState, FormRules } from '../../interface/interface'
import moment, {Moment} from 'moment';
const props = defineProps<{
  span: number,
  label: string,
  name: string,
  dateFormat: string,
  isReset?: boolean;
}>()

const emit = defineEmits(['sendDate'])
const dateDatas: any = reactive({
  label: props.label,
  name: props.name,
  value: '',
  date: ''
})

function sendDatepickerEmit () {
  const formatDatas = {
    label: dateDatas.label,
    name: dateDatas.name,
    value: dateDatas.value
  };
  emit('sendDate', formatDatas.value);
}

watch(()=> props.isReset, ()=> {
  dateDatas.value = ''
})

</script>

<style lang="less" scoped>
</style>
