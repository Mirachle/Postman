<template>
        <span :class="[spannClassName,success==1?'suc':'fail']"></span>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'GrayCircle',
  data() {
    return {
      spannClassName: 'gray-circle',
    };
  },
  props: ['success'],
};
</script>

<style>
.gray-circle{
    width: 8px;
    height: 8px;
    border-radius: 4px;
    border: 1px solid black;
    display: inline-block;
    background: #A1A1A1;
    padding: 0px;
}
.suc{
    background: lime;
}
.fail{
    background: #ff7e7e;
}
</style>
