<template>
  <div>
    <select @change="optionChange" v-model="selected" class="minimal">
      <option>POST</option>
      <option>GET</option>
      <option>PATCH</option>
      <option>DELETE</option>
      <option>PUT</option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'DropDownComp',
  data() {
    return {
      selected: 'POST',
    };
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
  margin-left: 1vw;
  color:  black;
  font-weight: 600;

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
