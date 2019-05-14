<template>
  <div>
    <div class="head-head row">
      <div class="col-5" style="margin-left:-10px;">
        <p>Key:</p>
      </div>
      <div class="col-6" style="margin-left: 10px;">
        <p>Value:</p>
      </div>
    </div>
    <transition-group name="listgroup" tag="div">
      <div v-for="(item,index) in currentList" :key="item" class="list-item">
        <environment-list
          @clicked="deleteListItem"
          @plusClicked="plusListItem"
          @keyChanged="keyChanged"
          @valueChanged="valueChanged"
          :item="item"
          :index="index"
          headComp="true"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import EnvironmentList from "@/components/Environment/EnvironmentList";

export default {
  name: "HeadComp",
  components: {
    "environment-list": EnvironmentList
  },
  props:['currentList'],
  methods:{
    deleteListItem(index){
      if(this.currentList.length > 1) {
        this.currentList.splice(index,1)
      }
    },
    plusListItem(index){
      this.currentList.splice(index+1,0,{
        key: '',
        value: ''
      })
    },
    keyChanged(key, index){
      this.$emit('keyChanged', key, index)
    },
    valueChanged(value, index){
      this.$emit('valueChanged', value, index)
    }
  }
};
</script>

<style scoped>
.list-item{
  width:100%;
  transition: all 0.2s;
  display: inline-block;
}
.listgroup-enter{
  opacity: 0;
  transform: translateY(30px);
}
.listgroup-leave-to{
  opacity: 0;
}

.listgroup-enter-active{
  transition: all 0.2s;
}
.listgroup-leave-active {
  position: absolute;
}

.head-head{
  margin: 0px 0;
  padding: 0;
}
</style>
