<template>
  <div>
    <input @click="$emit('send')" type="button" value="SEND">
  </div>
</template>

<script>

export default {
  name: 'ButtonComp',
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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
}
</style>
