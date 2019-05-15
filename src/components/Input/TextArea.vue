<template>
  <div>
    <textarea v-model="value" @input="areaChanged"
    placeholder='{                                               JSON like this.
  "password": "letmein",
  "email": "test@codeyard.eu"
  }'/>
  </div>
</template>

<script>

export default {
  name: 'TextArea',
  props: {
    areaValue: {
      type: String,
      default: ''
    }
  },
  mounted(){
    this.value = this.areaValue;
  },
  data() {
    return {
      value: undefined
    };
  },
  watch:{
   areaValue(newValue,oldValue){
      this.value = newValue;
   }
  },
  methods: {
    areaChanged() {
      this.$emit('areaChanged', this.value)
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
