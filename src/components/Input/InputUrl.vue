<template>
  <div>
    <input v-model="url" type="text" placeholder="Please enter url.">
  </div>
</template>

<script>

export default {
  name: 'InputUrl',
  data() {
    return {
      url: '',
    };
  },

  methods: {
    clearText() {
      this.$emit('sendUrl', this.url);
      this.url = '';
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

@media only screen and (max-width: 767.9px) {
    input{
      width: 100%;
    }
    div{
      padding: 0px;
    }
  }
</style>
