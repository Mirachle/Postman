<template>
  <div>
    <input-row @selectedChange="selected" @clicked="clicked" :activeIndex="activeIndex"/>
    <text-area v-if="areaVisible" :areaValue="areaValue" @areaChanged="areaChanged"/>
  </div>
</template>

<script>
import InputRow from "@/components/Input/InputRow";
import TextArea from "@/components/Input/TextArea";
import { mapGetters } from "vuex";

export default {
  name: "InputComp",
  props: ['activeIndex'],
  data() {
    return {
      areaVisible: true,
      areaValue: "",
    };
  },

  components: {
    "input-row": InputRow,
    "text-area": TextArea
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
  }
};
</script>
