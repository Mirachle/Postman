<template>
  <div>
    <div :class="['row', allTime, this.isShowResult==1? 'in-cont':'in-cont-select']">
      <div :class="['col-12', 'col-md-1']" :id="itemCircleId">
        <circle-icon :index="index" :success="isSuccess"/>
      </div>
      <div :class="['col-12', 'col-md-2']" :id="itemTypeId">{{this.item.type}}</div>
      <div :class="['col-12' ,'col-md-5']" :id="itemUrlTextId">{{this.item.urlText}}</div>
      <div :class="['col-12', 'col-md-2']" :id="itemValueId">{{this.item.value}}</div>
      <div :class="['col-12', 'col-md-2']" :id="itemShapeId">
        <shape-icon :selected="isShowResult" @clicked="Clicked()"/>
      </div>
    </div>
    <div v-if="this.isShowResult==1? '':'hide'" :class="['row']">
      <div :class="['col-12','animated', effectName]" :id="itemResultId">{{this.item.result}}</div>
    </div>
  </div>
</template>

<script>
import Circle from '@/components/List/Circle';
import Shape from '@/components/List/Shape';

/* eslint-disable */
export default {
  name: 'ItemComp',
  props: ['item', 'index'],
  components: {
    'shape-icon': Shape,
    'circle-icon': Circle,
  },
  data() {
    return {
      isShowResult: 1,
      itemTypeId: 'item-type',
      itemUrlTextId: 'item-url',
      itemValueId: 'item-value',
      itemShapeId: 'item-shape',
      itemCircleId: 'item-circle',
      itemResultId: 'item-result',
      isSuccess: 0,
      effectName: 'fadeInDown',
    };
  },
  computed: {
    allTime() {
      if (this.item.value >= 200 && this.item.value < 300) {
        this.isSuccess = 1;
      } else {
        this.isSuccess = 0;
      }
    },
  },
  methods: {
    Clicked() {
      if (this.isShowResult) {
        this.effectName = 'fadeInDown';
        this.isShowResult = 0;
      } else {
        this.effectName = '';
        this.isShowResult = 1;
      }
    },
  },
};
</script>

<style scoped>
.row{
  margin: 0;
}
.in-cont {
  background-color: #1111111a;
  border-radius: 15px;
  margin: 0;
  margin-top: 10px;
}
.in-cont-select {
  background-color: #1111111a;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  margin: 0;
  margin-top: 10px;
}
#item-result {
  background-color: #bebebe;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  word-break: break-all;
}
#item-circle {
  display: flex;
  align-items: center;
  justify-content: center;
}
#item-type {
  text-transform: uppercase;
  text-align: center;
  font-weight: 600;
}
#item-url {
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#item-value {
  text-align: center;
  font-weight: 600;
}
#item-shape {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hide {
  display: none;
}

.row{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
