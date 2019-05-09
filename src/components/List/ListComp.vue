<template>
<div class="row">
    <div v-for="(item,index) in list" :key="index" style="width:100%;">
       <item-comp class="animated lightSpeedIn" :item="item" :index="index"/>
    </div>
</div>
</template>

<script>
import ItemComp from '@/components/List/ItemComp';

export default {
  name: 'ListComp',
  props: ['list'],
  components: {
    'item-comp': ItemComp,
  },
};

</script>

<style scoped>

</style>
