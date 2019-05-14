<template>
  <div class="row item">
    <div class="col-5 input">
      <input v-model="itemKey" @input="keyChanged" id="in">
    </div>
    <div class="col-6 input">
      <input v-model="itemValue" @input="valueChanged" id="in">
    </div>
    <div id="delicon" class="col-1 input">
      <ic-delete v-if="headComp" class="ic-delete rotation" :r="25" @clicked="$emit('plusClicked', index)"/>
      <ic-delete class="ic-delete" :r="25" @clicked="$emit('clicked', index)"/>
    </div>
  </div>
</template>

<script>
import IcDelete from "@/components/SendList/IcDelete";

export default {
  name: "EnvironmentList",
  props: ["index", "item", 'headComp'],

  mounted(){
    this.itemKey = this.item.key;
    this.itemValue = this.item.value;
  },
  data() {
    return {
      itemValue: undefined,
      itemKey: undefined,
    };
  },

  components: {
    "ic-delete": IcDelete
  },
  methods: {
    keyChanged() {
      this.$emit("keyChanged", this.itemKey, this.index);
    },
    valueChanged() {
      this.$emit("valueChanged", this.itemValue, this.index);
    }
  }
};
</script>

<style scoped>
#delicon {
  display: none;
}
.item:hover #delicon {
  display: inline-block;
  position: relative;
}

.item {
  padding-bottom: 10px;
}

#in {
  width: 100%;
}
.ic-delete {
  position: absolute;
  margin-right: 10px;
  right: 0px;
}

.rotation{
  transform: rotate(45deg);
  margin-right: 40px;
}
</style>

