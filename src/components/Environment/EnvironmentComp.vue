<template>
  <div>
      <button-comp :class="[showModal ? blurClass : '', bkClass, 'line2']" buttonValue="Environment" @clicked="$emit('open')"/>
      <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <modal @close="$emit('close')" v-if="showModal"/>
      </transition>
  </div>
</template>

<script>
import Modal from "@/components/Environment/ModalComp";
import ButtonComp from '@/components/Input/ButtonComp';

export default {
  name: "EnvironmentComp",
  props: ['showModal'],
  data() {
    return {
      bkClass: 'bk',
      blurClass: 'blur',
      };
  },

  components: {
    "modal": Modal,
    'button-comp': ButtonComp,
  },
};

</script>

<style scoped>
.bk {
  transition: all 0.1s ease-out;
}

.blur {
  filter: blur(1px);
  opacity: 0.4;
}
.line2{
  text-align: center;
  margin-bottom: 10px;
  border-style: solid;
  border-width: 0px 0px 3px 0px;
  border-color: #1111111a;
  padding-bottom: 15px;
  margin-bottom: 15px;
  margin-top: 15px;
}

</style>


