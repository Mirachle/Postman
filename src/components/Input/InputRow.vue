<template>
  <div class="row">
    <dropdown-comp class="col-md-2 col-12 col-sm-4 center" @selected="selectedChange"/>
    <input-url class="col-md-9 col-12 col-sm-8 center" @sendUrl="sendUrl"/>
    <button-comp class="col-md-1 col-12 col-sm-12 center" @send="$emit('send')"/>
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
  methods: {
    selectedChange(value) {
      this.$emit('selectedChange', value);
    },
    sendUrl(url) {
      this.$emit('sendUrl', url);
    },
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
</style>
