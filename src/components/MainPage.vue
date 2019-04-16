<template>
  <div class="col-10 offset-1">
    <input-comp class="row"/>
    <list-comp class="row"/>
  </div>
</template>

<script>
import InputComp from "@/components/InputComp";
import ListComp from "@/components/ListComp";

export default {
  name: 'MainPage',
  data() {
    return {
      list: [
        { isSuccess: false, type: "get", urlText: "fgs", value: "200", result: "sgsd"},
      ],
    };

  },
  components: {
    "input-comp": InputComp,
    "list-comp": ListComp
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
