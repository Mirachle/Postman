<template>
  <div class="col-10 offset-1">
    <input-comp class="row"/>
    <list-comp :list="list"/>
  </div>
</template>

<script>
import InputComp from "@/components/InputComp";
import ListComp from "@/components/List/ListComp";

export default {
  name: 'MainPage',
  data() {
    return {
      list: [
        { isSuccess: false, type: "get", urlText: "http://codeyard.eu", value: "200", result:[ "HTTP/1.1 301 Moved Permanently",
        "Server: nginxyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
        ]},
        { isSuccess: true, type: "post", urlText: "http://codeyard.com", value: "400", result: "sgsd"}
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
