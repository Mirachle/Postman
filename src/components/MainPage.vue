<template>
  <div class="row">
    <div class="col-md-3 col-12 line">
      <send-list @clicked="clicked" :list="sendList"/>
    </div>
    <div class="col-md-9 col-12">
      <input-comp :index="itemIndex" @send="send" @save="save"/>
      <list-comp :list="list"/>
    </div>
  </div>
</template>

<script>
import InputComp from "@/components/Input/InputComp";
import ListComp from "@/components/List/ListComp";
import SendList from "@/components/SendList/SendList";
import {mapActions, mapGetters} from 'vuex';
import Swal from 'sweetalert2'

export default {
  name: "MainPage",
  data() {
    return {
      itemIndex: undefined,
      };
  },

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
      'originError',
      'postPutPatchSave',
      'getDeleteSave'
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
    save(data){
      var url = data.url;
      var selected = data.method;
      var textArea = data.text;
      Swal.fire({
        title: 'Saved name',
        input: 'text',
        inputPlaceholder: 'Enter here',
      }).then((result) => {
        if (result.value) {
          if ((selected == "post") || (selected == "put") || (selected == "patch")) {
            this.postPutPatchSave([(result.value),selected, url, textArea])
          }else{
            this.postPutPatchSave([(result.value),selected, url])
          }
        }
      })
    },
    clicked(index){
      this.itemIndex = index;
    }
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

@media (max-width: 767.9px) {
  .line{
    border-width: 0px 0px 0px 0px;
    border-color: #ffffff00;
    right: 0px;
    margin-bottom: 10vh;
  }
}
</style>


