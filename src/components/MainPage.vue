<template>
  <div class="col-10 offset-1">
    <input-comp @send="send"/>
    <list-comp :list="list"/>
  </div>
</template>

<script>
import axios from "axios";
import InputComp from "@/components/Input/InputComp";
import ListComp from "@/components/List/ListComp";

export default {
  name: "MainPage",
  data() {
    return {
      list: [],
      selected: "post",
      url: '',
      textArea: "",
      response: "",
      statusCode: "",
    };
  },

created(){
axios.interceptors.response.use((response) => response, (error) => {
  if (typeof error.response === 'undefined') {
    this.response = error;
    this.statusCode = '400';
    this.listPush();
  }
  return Promise.reject(error)
})
},

  components: {
    "input-comp": InputComp,
    "list-comp": ListComp
  },

  methods: {
    clear(){
      this.url = "";
      this.response = "";
      this.statusCode = "";
      this.textArea = "";
    },
    handleError(e) {
      try{
        this.response = JSON.stringify(e.response).replace(/"/g, " ");
        this.statusCode = JSON.stringify(e.response.status);
        this.listPush();
      }
      catch(e){
      if (e.response) {
          this.response = JSON.stringify(e.response).replace(/"/g, " ");
          this.statusCode = JSON.stringify(e.response.status);
          this.listPush();
        } else {
          this.list.push({
            type: this.selected,
            urlText: this.url,
            result: e.message,
            value: "0"
          });
         this.clear();
        }
      }
    },
    listPush() {
      this.list.push({
        type: this.selected,
        urlText: this.url,
        result: this.response,
        value: this.statusCode,
      })
      this.clear();
    },
    send(data) {
      this.url = JSON.stringify(data.url).replace(/"/g, "");
      this.selected = JSON.stringify(data.method).replace(/"/g, "");
      this.textArea = data.text;
      if(this.url != ("" | " ")){
        try {
          if ((this.selected == "post") || (this.selected == "put") || (this.selected == "patch")) {
            axios[this.selected](this.url, JSON.parse(this.textArea))
              .then(r => {
                if (r.data.result){
                  this.response = JSON.stringify(r.data.result).replace(/"/g, " ");
                  this.statusCode = JSON.stringify(r.status);
                  this.listPush();
                }
                else {
                  this.response = JSON.stringify(r.data).replace(/"/g, " ");
                  this.statusCode = JSON.stringify(r.status);
                  this.listPush();
                }
              })
              .catch(e => this.handleError(e));
          }
          else{
            axios[this.selected](this.url)
              .then(r => {
                this.response = JSON.stringify(r.data).replace(/"/g, " ");
                this.statusCode = JSON.stringify(r.status);
                this.listPush();
              })
              .catch(e => this.handleError(e));
          }
        } catch (e) {
          this.handleError(e)
        }
      }
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

