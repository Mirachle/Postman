<template>
  <div class="row">
    <dropdown-comp class="col-md-2 col-12 col-sm-4 center" @selected="selectedChange"/>
    <input-url class="col-md-9 col-12 col-sm-8 center" :url="url" @urlChanged="urlChanged"/>
    <button-comp class="col-md-1 col-12 col-sm-12 center" @send="send"/>
  </div>
</template>

<script>
import DropDownComp from '@/components/Input/DropDownComp';
import InputUrl from '@/components/Input/InputUrl';
import ButtonComp from '@/components/Input/ButtonComp';

export default {
  name: 'InputRow',
  components: {
    'dropdown-comp': DropDownComp,
    'input-url': InputUrl,
    'button-comp': ButtonComp,
  },
  data(){
    return {
      url: '',
      method: 'post'
    }
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
