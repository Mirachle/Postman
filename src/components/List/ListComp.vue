<template>
  <div>
    <input type="button" @click="download" value="Export">
    <input type="button" @click="$emit('clearList')" value="Clear">
    <div class="row" style="width:100%;">
      <transition-group name="fade" tag="div" style="width:100%;">
        <div v-for="(item,index) in list" :key="item" class="list-item">
          <item-comp :item="item" :index="index"/>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import ItemComp from '@/components/List/ItemComp';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'ListComp',
  props: ['list'],
  components: {
    'item-comp': ItemComp,
  },
  computed: {
    ...mapGetters({
    //  list: 'getList'
    })
  },
  methods: {
    download(){
      const data = JSON.stringify(this.list, null, 2)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "list.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href];
      e.initEvent('click', true, false);
      a.dispatchEvent(e);
    }
  }
};

</script>

<style scoped>
.row{
  margin-left: 0px;
}

input {
  border-width: 0px;
  border-radius: 5px;
  background-color: #1111111a;
  font-weight: 600;
  padding: 3px;
  padding-right: 10px;
  padding-left: 10px;
  cursor: pointer;
}
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
