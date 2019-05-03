<template>
  <div class="row">
    <input @click="$emit('clicked')" type="button" :value="item">
    {{this.inputValue}}
  </div>
</template>

<script>

export default {
  name: 'SendItem',
  props: ['item', 'index'],
  data() {
    return {
      inputValue: ''
    };
  },
};
</script>

<style scoped>
input {
  border: 0px;
  border-radius: 5px;
  background-color: #1111111a;
  font-weight: 600;
  padding: 3px;
  padding-right: 10px;
  padding-left: 10px;
  cursor: pointer;
  margin: 2%;
}
</style>
