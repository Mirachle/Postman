<template>
  <div class="col-10 offset-1">
    <input-comp @selected="selectedChange" @sendUrl="sendUrl" @area="area" @send="send"/>
    <list-comp :list="list"/>
  </div>
</template>

<script>
import axios from "axios";
import InputComp from "@/components/Input/InputComp";
import ListComp from "@/components/List/ListComp";

/* eslint-disable */

export default {
  name: "MainPage",
  data() {
    return {
      list: [
        {
          isSuccess: false,
          type: "get",
          urlText: "http://codeyard.eu",
          value: "200",
          result: [
            "HTTP/1.1 301 Moved Permanently",
            "Server: nginxyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
          ]
        },
        {
          isSuccess: true,
          type: "post",
          urlText: "http://codeyard.com",
          value: "400",
          result: "sgsd"
        }
      ],
      selected: "post",
      url: 'https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate',
      textArea: "",
      response: "",
      statusCode: ""
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
    selectedChange(value) {
      this.selected = value;
    },
    sendUrl(value) {
      this.url = value;
    },
    area(value) {
      this.textArea = value;
    },
    handleError(e) {
      this.response = JSON.stringify(e.response).replace(/"/g, " ");
      this.statusCode = JSON.stringify(e.response.status);
      this.listPush();
    },
    listPush() {
      this.list.push({
        type: this.selected,
        urlText: this.url,
        result: this.response,
        value: this.statusCode,
      });
    },
    async send() {
      try {
        if ((this.selected == "post") || (this.selected == "put") || (this.selected == "patch")) {
          axios[this.selected](this.url, {
            data: JSON.parse(this.textArea)
            })
            .then(r => {
              this.response = JSON.stringify(r.data.result).replace(/"/g, " ");
              this.statusCode = JSON.stringify(r.status);
              this.listPush();
            })
            .catch(e => this.handleError(e));
        } else{
          axios[this.selected](this.url)
            .then(r => {
              this.response = JSON.stringify(r.data).replace(/"/g, " ");
              this.statusCode = JSON.stringify(r.status);
              this.listPush();
            })
            .catch(e => this.handleError(e));
        }
      } catch (e) {
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
        }
      }
      this.response = "";
      this.statusCode = "";
    }
  }
};

/*
https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate
{
"password": "letmein",
"email": "test@codeyard.eu"
}
console.log(r);
console.log(this.response);
console.log(this.statusCode);
*/
</script>

