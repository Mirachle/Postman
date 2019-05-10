<template>
  <div class="row" style="width:100%;">
    <transition-group name="fade" tag="div" style="width:100%;">
      <div v-for="(item,index) in list" :key="item" class="list-item">
        <item-comp :item="item" :index="index"/>
      </div>
    </transition-group>
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
.list-item{
  width:100%;
  transition: all 0.2s;
}
.fade-enter{
  opacity: 0;
  transform: translateY(30px);
}
.fade-leave-to{
  opacity: 0;
  transform: translateX(300px);
}

.fade-enter-active{
  transition: all 0.2s;
}
.fade-leave-active {
  position: absolute;
}
</style>
