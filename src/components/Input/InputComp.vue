<template>
  <div>
    <input-row @selectedChange="selected" @clicked="clicked" :activeIndex="activeIndex"/>
    <div class="filter-container">
    <div class="filter-class" v-for="(item,index) in filterList" :key="item" @click="filterItemClicked(index)">
      <filter-button :item="item" :index="index" @change="selectedIndexChange" :selectIndex="isSelected" :areaVisible="areaVisible"/>
    </div>
    </div>
    <text-area v-if="areaVisible & isSelected == 1" :areaValue="areaValue" @areaChanged="areaChanged"/>
    <head-comp v-if="isSelected == 0" :currentList="currentList" @keyChanged="keyChanged" @valueChanged="valueChanged"/>
  </div>
</template>

<script>
import InputRow from "@/components/Input/InputRow";
import TextArea from "@/components/Input/TextArea";
import HeadComp from "@/components/Input/HeadComp";
import FilterButtonComp from "@/components/Input/FilterButtonComp"
import { mapGetters } from "vuex";

export default {
  name: "InputComp",
  props: ['activeIndex', 'currentList'],
  data() {
    return {
      areaVisible: true,
      areaValue: "",
      filterList: ['HEADER', 'BODY'],
      isSelected: 0
    };
  },
  components: {
    "input-row": InputRow,
    "text-area": TextArea,
    "head-comp": HeadComp,
    "filter-button": FilterButtonComp
  },
  computed: {
    ...mapGetters({
      sendList: "getSendList"
    }),
    isBody(value){
      alert(value)
      if(value == 0)
        return false;
      if(!areaVisible)
        return true;
        return false;
    },
  },
  watch: {
    activeIndex(newValue, oldValue) {
      if (this.activeIndex != undefined){
        this.areaValue = this.sendList[newValue].bodyValue;
      }
      else {
        this.areaValue = ""
      }
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
    },
    selectedIndexChange(){
      this.isSelected = 0;
    },
    keyChanged(key, index){
      this.$emit('keyChanged', key, index)
    },
    valueChanged(value, index){
      this.$emit('valueChanged', value, index)
    },
  },
};
</script>

<style scoped>
input{
  cursor: pointer;
}
.filter-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 6vw;
}

.filter-class{
  margin-bottom: 5px;
}

@media only screen and (max-width: 767.9px) {
    .filter-container{
      flex-direction: column;
      padding: 0;
      align-items: center;
    }
  }

</style>

