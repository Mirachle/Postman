<template>
  <div style="padding:0px;">
    <select @change="optionChange" v-model="selected" class="minimal">
      <option value="post">POST</option>
      <option value="get">GET</option>
      <option value="patch">PATCH</option>
      <option value="delete">DELETE</option>
      <option value="put">PUT</option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DropDownComp',
  props:['index'],
  data() {
    return {
      selected: 'post',
    };
  },
  computed: {
    ...mapGetters({
      sendList: 'getSendList'
      })
  },
   watch:{
   index(newValue,oldValue){
     this.selected = this.sendList[newValue].type;
     this.$emit('selected', this.selected);
   }
   },
  methods: {
    optionChange() {
      this.$emit('selected', this.selected);
    },
  },

};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
select {

  /* styling */
  background-color: #1111111a;
  border: 0px;
  border-radius: 5px;
  display: inline-block;
  font: inherit;
  padding: 0.2em 2em 0.2em 0.5em;
  color:  black;
  font-weight: 600;
  cursor: pointer;

  /* reset */

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

select.minimal {
  background-image:
    linear-gradient(45deg, transparent 50%,  #5f5f5f 50%),
    linear-gradient(135deg,  #5f5f5f 50%, transparent 50%);
  background-position:
    calc(100% - 20px) calc(0.9em),
    calc(100% - 15px) calc(0.9em);
  background-size:
    5px 5px,
    5px 5px;
  background-repeat: no-repeat;
}
</style>
