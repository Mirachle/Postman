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
      url: 'https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate',
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
  width: 100%;
  border-radius: 5px;
  min-height: 30px;
}
</style>
