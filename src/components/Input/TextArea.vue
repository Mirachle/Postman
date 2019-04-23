<template>
  <div>
    <input v-model="areaValue" type="textarea" @keyup="area">
  </div>
</template>

<script>

export default {
  name: 'TextArea',
  data() {
    return {
      areaValue: '',
    };
  },
  methods: {
    area(value) {
      this.$emit('area', this.areaValue);
    },
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
input{
  width: 100%;
  min-height: 100px;
  border-radius: 15px;
  margin-top: 10px;
}
</style>
