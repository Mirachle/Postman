<template>
  <div>
    <input v-model="value" type="text" placeholder="Please enter url." @input="urlChanged">
  </div>
</template>

<script>

export default {
  name: 'InputUrl',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: undefined
    };
  },
  watch:{
   url(newValue,oldValue){
      this.value = newValue;
   }
  },
  methods: {
    urlChanged(){
      this.$emit('urlChanged', this.value)
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
input{
  width: 85%;
  border-radius: 5px;
  min-height: 30px;
}

@media only screen and (max-width: 767.9px) {
    input{
      width: 100%;
    }
    div{
      padding: 0px;
    }
  }
</style>
