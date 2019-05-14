<template>
  <div>
      <button-comp :class="[showModal ? blurClass : '', bkClass, 'line2']" buttonValue="Environment" @clicked="showModal = true"/>
      <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <modal @close="showModal = false" v-if="showModal"/>
      </transition>
  </div>
</template>

<script>
import Modal from "@/components/Environment/ModalComp";
import ButtonComp from '@/components/Input/ButtonComp';

export default {
  name: "EnvironmentComp",
  data() {
    return {
      showModal: false,
      modalEffect: "",
      maskEffect: "",
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


