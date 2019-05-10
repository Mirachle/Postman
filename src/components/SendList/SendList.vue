<template>
<div>
  <transition-group name="fade" tag="div">
    <div v-for="(item,index) in list" :key="item"  class="list-item">
      <send-item @clicked="$emit('clicked', index)" :item="item" :index="index" :activeIndex="activeIndex"/>
    </div>
  </transition-group>
</div>
</template>

<script>
import SendItem from '@/components/SendList/SendItem';

export default {
  name: 'SendList',
  props: ['list', 'activeIndex'],
  components: {
    'send-item': SendItem,
  },
};

</script>

<style scoped>
.list-item{
  transition: all 0.2s;
  display: block;
}
.fade-enter{
  opacity: 0;
  transform: translateY(30px);
}
.fade-leave-to{
  opacity: 0;
  transform: translateX(100px);
}

.fade-enter-active{
  transition: all 0.2s;
}
.fade-leave-active {
  transition: all 0.2s;
}
</style>

