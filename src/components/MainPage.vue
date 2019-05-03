<template>
  <div class="row">
    <div class="col-3 line">
      <send-list @click="clicked" :list="sendList"/>
    </div>
    <div class="col-9">
      <input-comp @send="send"/>
      <list-comp :list="list"/>
    </div>
  </div>
</template>

<script>
import InputComp from "@/components/Input/InputComp";
import ListComp from "@/components/List/ListComp";
import SendList from "@/components/SendList/SendList";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "MainPage",

  components: {
    "input-comp": InputComp,
    "list-comp": ListComp,
    "send-list": SendList,
  },

  created(){
    this.originError();
  },

  computed: {
    ...mapGetters({
      list: 'getList',
      sendList: 'getSendList'
      })
  },

  methods: {
    ...mapActions([
      'postPutPatchPush',
      'getDeletePush',
      'handleError',
      'originError'
    ]),
    send(data) {
      var url = JSON.stringify(data.url).replace(/"/g, "");
      var selected = JSON.stringify(data.method).replace(/"/g, "");
      var textArea = data.text;
      if(url != ("" | " ")){
        try {
          if ((selected == "post") || (selected == "put") || (selected == "patch")) {
            this.postPutPatchPush([selected, url, textArea])
          }
          else{
            this.getDeletePush([selected, url])
          }
        } catch (e) {
          this.handleError([e, selected, url])
        }
      }
    },
  }
};

/*
https://jsonplaceholder.typicode.com/posts
{
"id": 1,
"title": "foo",
"body": "bar",
"userId": 1
}
*/
</script>

<style scoped>
.line{
  border-style: solid;
  border-width: 0px 3px 0px 0px;
  border-color: #1111111a;
  right: 15px;
}
</style>


