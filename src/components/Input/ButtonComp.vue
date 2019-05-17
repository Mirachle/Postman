<template>
  <div>
    <input
      :class="[ !saveAsButton ? 'cursor-enable' : 'cursor-disable']"
      :disabled="saveAsButton"
      @click="$emit('clicked', buttonValue)"
      type="button"
      :value="buttonValue"
    >
  </div>
</template>

<script>
export default {
  name: "ButtonComp",
  props: ["buttonValue", "active", 'disable'],
  computed: {
    saveAsButton() {
      if ((this.buttonValue == "SAVE AS" && this.active == undefined) || (this.disable == true)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
input {
  border-width: 0px;
  border-radius: 5px;
  background-color: #1111111a;
  font-weight: 600;
  padding: 3px;
  padding-right: 10px;
  padding-left: 10px;
}

.cursor-enable{
  cursor: pointer;
}

.cursor-disable{
  cursor: no-drop;
}

@media only screen and (max-width: 767.9px) {
  input {
    width: 80%;
    margin-top: 10px;
  }
}
</style>
