<template>
  <input
    :class="[ !isDisabled ? 'cursor-enable' : 'cursor-disable',isSelected]"
    :disabled="isDisabled"
    type="button"
    :value="item"
  >
</template>

<script>
export default {
  props: {
    item: {
      type: String
    },
    index: {
      type: Number
    },
    selectIndex: {
      type: Number
    },
    areaVisible: {
      type: Boolean
    }
  },
  computed: {
    isSelected() {
      if (this.index == this.selectIndex) return "selected";
      return "";
    },
    isDisabled() {
      if (this.item == "HEADER") {
        if ((this.selectIndex == 1) & !this.areaVisible) {
          this.$emit("change");
        }
        return false;
      }
      return !this.areaVisible;
    }
  }
};
</script>


<style scoped>
input {
  border-width: 0px;
  border-radius: 5px;
  background-color: #1111111a;
  font-weight: 600;
  padding: 3px;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 10%;
  color: black;
  outline: none;
  text-align: center;
}
.selected {
  color: white;
}
.cursor-enable {
  cursor: pointer;
  margin-top: 20px;
}
.cursor-disable {
  cursor: no-drop;
  color: rgb(120, 120, 120);
  margin-top: 20px;
}
</style>
