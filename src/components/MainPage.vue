<template>
  <div class='col-10 offset-1'>
    <input-comp @selected="selectedChange" @sendUrl="sendUrl" @area="area" @send="send"/>
    <list-comp :list='list'/>
  </div>
</template>

<script>
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
      selected: 'POST',
      url: '',
      textarea: '',
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
      this.textarea = value;
    },
    send() {
      this.list.push({ type: this.selected, urlText: this.url});
    }
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
