<template>
  <div class="row">
    <dropdown-comp class="col-md-2 col-12 col-sm-4 center" @selected="selectedChange"/>
    <input-url class="col-md-8 col-12 col-sm-8 center" :url="url" @urlChanged="urlChanged"/>
    <button-comp class="col-md-1 col-12 col-sm-12 center" @send="send" :buttonValue="sendButtonValue"/>
    <button-comp  class="col-md-1 col-12 col-sm-12 center" @save="save" :buttonValue="saveButtonValue"/>
  </div>
</template>

<script>
import DropDownComp from '@/components/Input/DropDownComp';
import InputUrl from '@/components/Input/InputUrl';
import ButtonComp from '@/components/Input/ButtonComp';
import { mapGetters } from 'vuex';

export default {
  name: 'InputRow',
  props: ['index'],
  components: {
    'dropdown-comp': DropDownComp,
    'input-url': InputUrl,
    'button-comp': ButtonComp,
  },
  data(){
    return {
      url: '',
      method: 'post',
      sendButtonValue: 'SEND',
      saveButtonValue: 'SAVE'
    }
  },
  watch:{
   index(newValue,oldValue){
      this.url = this.sendList[newValue].urlText;
   }
  },
  computed: {
    ...mapGetters({
      sendList: 'getSendList'
    })
  },
  methods: {
    urlChanged(url){
      this.url = url;
    },
    selectedChange(value) {
      this.$emit('selectedChange', value);
      this.method = value;
    },
    send(){
      this.$emit('send', {
        url: this.url,
        method: this.method
      });
      this.url='';
    },
    save(){
      this.$emit('save', {
        url: this.url,
        method: this.method
      });
    }
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.row{
  width: 100%;
  margin-top: 10px;
}

.center{
  text-align: center;
}

@media only screen and (max-width: 767.9px) {
    .row{
      margin: auto;
      margin-top: 10px;
    }
  }
</style>
