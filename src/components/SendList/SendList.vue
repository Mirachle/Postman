<template>
<div>
    <div v-for="(item,index) in list" :key="index" style="width:100%;">
       <send-item @clicked="$emit('clicked', index)" :item="item" :index="index"/>
    </div>
</div>
</template>

<script>
import SendItem from '@/components/SendList/SendItem';

export default {
  name: 'SendList',
  props: ['list'],
  components: {
    'send-item': SendItem,
  },
};

</script>
