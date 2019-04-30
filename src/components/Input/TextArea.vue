<template>
  <div>
    <textarea v-model="areaValue" placeholder='{
  "password": "letmein",
  "email": "test@codeyard.eu"
  }'/>
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
    clearArea() {
      this.$emit('area', this.areaValue);
      this.areaValue = '';
    }
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
textarea{
  width: 100%;
  min-height: 100px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
