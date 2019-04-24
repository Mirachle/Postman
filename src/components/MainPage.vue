<template>
  <div class='col-10 offset-1'>
    <input-comp @selected="selectedChange" @sendUrl="sendUrl" @area="area" @send="send"/>
    <list-comp :list='list'/>
  </div>
</template>

<script>
import axios from 'axios';
import InputComp from '@/components/Input/InputComp';
import ListComp from '@/components/List/ListComp';

export default {
  name: 'MainPage',
  data() {
    return {
      list: [
        { isSuccess: false,
          type: 'get',
          urlText: 'http://codeyard.eu',
          value: '200',
          result: ['HTTP/1.1 301 Moved Permanently',
            'Server: nginxyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
          ] },
        { isSuccess: true,
          type: 'post',
          urlText: 'http://codeyard.com',
          value: '400',
          result: 'sgsd' },
      ],
      selected: 'post',
      url: '',
      textArea: '',
      response: '',
      statusCode: '',
    };
  },

  components: {
    'input-comp': InputComp,
    'list-comp': ListComp,
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
    async send() {
      try {
        const r = await axios[this.selected](this.url, { data: JSON.parse(this.textArea) });
        this.response = (JSON.stringify(r.data.result)).replace(/"/g, ' ');
        this.statusCode = JSON.stringify(r.status);
        this.list.push({
          type: this.selected, urlText: this.url, result: this.response, value: this.statusCode,
        });
      } catch (e) {
        if (e.response) {
          this.response = (JSON.stringify(e.response)).replace(/"/g, ' ');
          this.statusCode = JSON.stringify(e.response.status);
          this.list.push({
            type: this.selected, urlText: this.url, result: this.response, value: this.statusCode,
          });
        } else {
          this.list.push({
            type: this.selected, urlText: this.url, result: e.message, value: '0',
          });
        }
      }
      this.response = '';
      this.statusCode = '';
    },
  },
};

/*
https://us-central1-ria-server-b1103.cloudfunctions.net/authenticate
{
"password": "letmein",
"email": "test@codeyard.eu"
}
*/

</script>

