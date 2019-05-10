<template>
  <div>
    <input-row @selectedChange="selected" @clicked="clicked" :activeIndex="activeIndex"/>
    <ul>
      <li :class="[isSelected == index ? 'selected' : '']" v-for="(item,index) in filterList" :key="item" @click="filterItemClicked(index)">
        {{item}}
      </li>
    </ul>
    <text-area v-if="areaVisible & isSelected == 1" :areaValue="areaValue" @areaChanged="areaChanged"/>
    <head-comp v-if="isSelected == 0"/>
  </div>
</template>

<script>
import InputRow from "@/components/Input/InputRow";
import TextArea from "@/components/Input/TextArea";
import HeadComp from "@/components/Input/HeadComp";
import { mapGetters } from "vuex";

export default {
  name: "InputComp",
  props: ['activeIndex'],
  data() {
    return {
      areaVisible: true,
      areaValue: "",
      filterList: ['HEADER', 'BODY'],
      isSelected: 1
    };
  },

  components: {
    "input-row": InputRow,
    "text-area": TextArea,
    "head-comp": HeadComp,
  },
  computed: {
    ...mapGetters({
      sendList: "getSendList"
    })
  },
  watch: {
    activeIndex(newValue, oldValue) {
      this.areaValue = this.sendList[newValue].bodyValue;
    }
  },

  methods: {
    selected(value) {
      if (value === "get" || value === "delete") {
        this.areaVisible = false;
      } else {
        this.areaVisible = true;
      }
    },
    areaChanged(value) {
      this.areaValue = value;
    },
    clicked(data) {
      this.$emit("clicked", {
        url: data.url,
        method: data.method,
        buttonType: data.buttonType,
        text: this.areaValue
      });
      this.areaValue = "";
    },
    filterItemClicked(value){
      this.isSelected= value;
    }
  }
};
</script>

<style scoped>
li{
  list-style-type: none;
}
ul{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.selected{
  font-weight: bold;
  text-decoration: underline;
}


</style>

