<template>
  <div>
    <input @keyup="sendUrl" v-model="url" type="text" placeholder="Please enter url.">
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
    sendUrl() {
        this.$emit('sendUrl', this.url);
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
</style>
