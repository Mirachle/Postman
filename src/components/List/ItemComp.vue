<template>
  <div>
    <div :class="['row', allTime, this.isShowResult==1? 'in-cont':'in-cont-select']">
      <div :class="['col-12', 'col-md-1']" :id="itemCircleId">
        <circle-icon :success="isSuccess"/>
      </div>
      <div :class="['col-12', 'col-md-2']" :id="itemTypeId">{{this.item.type}}</div>
      <div :class="['col-12' ,'col-md-6']" :id="itemUrlTextId">{{this.item.urlText}}</div>
      <div :class="['col-12', 'col-md-1']" :id="itemValueId">{{this.item.value}}</div>
      <div :class="['col-12', 'col-md-1']" :id="itemShapeId">
        <shape-icon :selected="isShowResult" @clicked="Clicked()"/>
      </div>
      <div class="col-md-1 ic-delete">
        <ic-delete @clicked="onDelete(index)" :r="15"/>
      </div>
    </div>
    <transition name="custom-classes-transition"
    enter-active-class="animated fadeInDown"
    leave-active-class="animated fadeOutUp">
    <div v-if="this.isShowResult==1? '':'hide'" class='row'>
      <div class="col-12" :id="itemResultId">
        <span>Header</span>
        {{this.item.header}}
      </div>
      <div class='col-12' :id="itemResultId">
        <span>Body</span>
        {{this.item.body}}
      </div>
      <div class="col-12" :id="itemResultBottomId">
        <span>Response</span>
        {{this.item.result}}
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import Circle from "@/components/List/Circle";
import Shape from "@/components/List/Shape";
import IcDelete from "@/components/SendList/IcDelete";
import { mapActions } from "vuex";

/* eslint-disable */
export default {
  name: "ItemComp",
  props: ["item", "index"],
  components: {
    "shape-icon": Shape,
    "circle-icon": Circle,
    "ic-delete": IcDelete
  },
  data() {
    return {
      isShowResult: 1,
      itemTypeId: "item-type",
      itemUrlTextId: "item-url",
      itemValueId: "item-value",
      itemShapeId: "item-shape",
      itemCircleId: "item-circle",
      itemResultBottomId: "item-result-bottom",
      isSuccess: 0,
      effectName: "fadeInDown",
      itemResultId: "item-result"
    };
  },
  computed: {
    allTime() {
      if (this.item.value >= 200 && this.item.value < 300) {
        this.isSuccess = 1;
      } else {
        this.isSuccess = 0;
      }
    }
  },
  methods: {
    Clicked() {
      this.isShowResult = !this.isShowResult;
    },
    ...mapActions(["onDelete"])
  }
};
</script>

<style scoped>
.row {
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
  text-align: center;
}
#item-result-bottom {
  background-color: #bebebe;
  text-align: center;
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
  justify-content: right;
  text-align: right;
}
.hide {
  display: none;
}
span{
  display: block;
  text-decoration: underline;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ic-delete {
  text-align: right;
}
@media only screen and (max-width: 767.9px) {
  .ic-delete {
    display: flex;
    justify-content: center;
  }
}

.slide-enter-active, .slide-leave-active {
  transition: opacity .5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
