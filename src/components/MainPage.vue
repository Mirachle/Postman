<template>
  <div class="col-10 offset-1">
    <input-comp @send="send"/>
    <list-comp :list="list"/>
  </div>
</template>

<script>
import InputComp from "@/components/Input/InputComp";
import ListComp from "@/components/List/ListComp";

export default {
  name: "MainPage",
  data() {
    return {
      selected: "post",
      url: '',
      textArea: "",
    };
  },

created(){
  this.$store.dispatch('originError');
},

  components: {
    "input-comp": InputComp,
    "list-comp": ListComp
  },

  computed: {
    list(){
      return this.$store.state.list
    }
  },

  methods: {
    send(data) {
      this.url = JSON.stringify(data.url).replace(/"/g, "");
      this.selected = JSON.stringify(data.method).replace(/"/g, "");
      this.textArea = data.text;
      if(this.url != ("" | " ")){
        try {
          if ((this.selected == "post") || (this.selected == "put") || (this.selected == "patch")) {
            this.$store.dispatch('postPutPatchPush', [this.selected, this.url, this.textArea])
          }
          else{
            this.$store.dispatch('getDeletePush', [this.selected, this.url])
          }
        } catch (e) {
          this.$store.dispatch('handleError', [e, this.selected, this.url])
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

