<template>
  <div class="osztaly">
    <input v-model="value" type="text" placeholder="Please enter url." @input="urlChanged" :class="color">
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
      value: undefined,
      reg: /(((http|https)\:\/\/)|(www)){1}[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*/g
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
  computed: {
    color(){
      if (this.reg.test(this.url)){
        return "";
      } else {
        return "red-color";
      }
    }
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

.osztaly{
  margin-right: 0px;
  padding-right: 0px;
  padding-left: 0px;
  margin-left: -2.6vw;
}

.red-color{
  border-color: rgb(255, 147, 147);
  background-color: rgb(255, 225, 225);
}
.blue-color{
  border-color: rgb(158, 147, 255);
  background-color: rgb(225, 227, 255);
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
