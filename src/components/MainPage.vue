<template>
  <div class="col-10 offset-1">
    <input-comp @send="send"/>
    <list-comp :list="list"/>
  </div>
</template>

<script>
import InputComp from "@/components/Input/InputComp";
import ListComp from "@/components/List/ListComp";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "MainPage",

  components: {
    "input-comp": InputComp,
    "list-comp": ListComp
  },

  created(){
    this.originError();
  },

  computed: {
    ...mapGetters({
      list: 'getList'
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

