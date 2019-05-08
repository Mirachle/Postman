<template>
  <div class="row NemMiraFuraOsztalya">
    <div class="col-5 input">
      <input v-model="key" @input="keyChanged" id="in">
    </div>
    <div class="col-6 input">
      <input v-model="value" @input="valueChanged" id="in">
    </div>
    <div id="delicon" class="col-1 input">
      <ic-delete class="ic-delete" :r="25" @clicked="$emit('clicked')"/>
    </div>
  </div>
</template>

<script>
import IcDelete from "@/components/SendList/IcDelete";
import { mapActions } from 'vuex';

export default {
  name: 'EnvironmentList',
  props:['index'],
  data(){
    return{
      key: '',
      value: ''
    }
  },
  components: {
    "ic-delete": IcDelete,
  },
  methods:{
    keyChanged(){
      this.$emit('keyChanged', this.key, this.index)
    },
    valueChanged(){
      this.$emit('valueChanged', this.value, this.index)
    }
  }
}
</script>

<style scoped>
#delicon { display: none; }
.NemMiraFuraOsztalya:hover #delicon { display: inline; }
#delicon:hover { display: inline; }


.row{
  padding-bottom: 10px;
}

#in{
  width: 100%;
}
.ic-delete{
  position: absolute;
  margin-right: 10px;
  right: 0px;
}
</style>

