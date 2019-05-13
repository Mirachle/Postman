<template>
  <div>
    <transition-group name="listgroup" tag="div">
      <div v-for="(item,index) in list" :key="item" class="list-item">
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
import EnvironmentList from "@/components/EnvironmentList";
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "HeadComp",
  components: {
    "environment-list": EnvironmentList
  },
  computed:{
    ...mapGetters({
      list: 'getHeaderList'
    }),
  },
  methods:{
    ...mapActions([
      'headerListPush',
      'headerListDelete',
      'headerListSave',
    ]),
    deleteListItem(index){
      this.headerListDelete(index)
    },
    plusListItem(index){
      this.headerListPush([index+1, '', ''])
    },
    keyChanged(key, index){
      this.list[index].key = key;
      this.headerListSave(this.list);
    },
    valueChanged(value, index){
      this.list[index].value = value;
      this.headerListSave(this.list);
    },
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
</style>
