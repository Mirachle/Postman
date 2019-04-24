<template>
  <div class="row">
    <dropdown-comp class="col-lg-2 col-12 center" @selected="selectedChange"/>
    <input-url class="col-lg-9 col-sm-6 col-12 center" @sendUrl="sendUrl"/>
    <button-comp class="col-lg-1 col-sm-6 col-12 center" @send="$emit('send')"/>
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
