<template>
  <div>
    <div class="col-3">
     <ul>
       <li v-for="(item,index) in requestsList" :key="index">
         <span>{{item.name}}</span>  
         <span>{{item.bodyValue}}</span>
       </li>
     </ul>
    </div>
    <div class="col-9 offset-3">
      <input-comp @send="send" @save="save"/>
      <list-comp :list="list"/>
    </div>
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
    "list-comp": ListComp,
  },

  created(){
    this.originError();
  },

  computed: {
    ...mapGetters({
      list: 'getList',
      requestsList: 'getRequestList'

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
     swal("Write something here:", { content: 'input', }) .then((value) => {
       if ((selected == "post") || (selected == "put") || (selected == "patch")) {
            this.postPutPatchSave([value,selected, url, textArea])
          }else{
            this.postPutPatchSave([value,selected, url])
          }
     });
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