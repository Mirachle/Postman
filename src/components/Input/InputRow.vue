<template>
  <div class="row">
    <!--<dropdown-comp class="col-md-2 col-12 col-sm-4 center" @selected="selectedChange" :index="activeIndex"/>-->
    <dropdown-comp
      class="col-md-2 col-12 col-sm-4 center"
      @selected="selectedChange"
      :index="activeIndex"
    />
    <input-url class="col-md-8 col-12 col-sm-8 center" :url="url" :color="color" @urlChanged="urlChanged"/>
    <div id="button-container" class="col-md-2 col-12 col-sm-12 center">
      <button-comp :disable="disable" id="button" @clicked="clicked" :buttonValue="sendButtonValue"/>
      <button-comp id="button" @clicked="clicked" :buttonValue="saveButtonValue"/>
      <button-comp
        id="button"
        @clicked="clicked"
        :buttonValue="saveAsButtonValue"
        :active="activeIndex"
      />
    </div>
  </div>
</template>

<script>
/*import DropDownComp from '@/components/Input/DropDownComp';*/
import InputUrl from "@/components/Input/InputUrl";
import ButtonComp from "@/components/Input/ButtonComp";
import DropDownComp from "@/components/Input/DropDownComp";
import { mapGetters } from "vuex";

export default {
  name: "InputRow",
  props: ["activeIndex"],
  components: {
    "input-url": InputUrl,
    "button-comp": ButtonComp,
    "dropdown-comp": DropDownComp
  },
  data() {
    return {
      url: "",
      method: "post",
      sendButtonValue: "SEND",
      saveButtonValue: "SAVE",
      saveAsButtonValue: "SAVE AS",
      disable: true,
      color: "",
      reg: /(((http|https)\:\/\/)|(www)){1}[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*/g,
    };
  },
  watch: {
    activeIndex(newValue, oldValue) {
      if (this.activeIndex != undefined){
        this.url = this.sendList[newValue].urlText;
      }
      else {
        this.url = ""
      }

    }
  },
  computed: {
    ...mapGetters({
      sendList: "getSendList"
    })
  },
  methods: {
    urlChanged(url) {
      this.url = url;
      if (this.reg.test(url)){
        this.disable = false
        this.color = ""
      } else {
        this.disable = true
        this.color = "red-color";
      }
    },
    selectedChange(value) {
      this.$emit("selectedChange", value);
      this.method = value;
    },
    clicked(value) {
      this.$emit("clicked", {
        url: this.url,
        method: this.method,
        buttonType: value
      });
      this.url = "";
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.row {
  width: 100%;
  margin-top: 10px;
}

.center {
  text-align: center;
}

@media only screen and (min-width: 768px) {
  #button-container {
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: -2.5vw;
  }

  #button {
    margin-right: 5px;
  }
}

@media only screen and (max-width: 767.9px) {
  .row {
    margin: auto;
    margin-top: 10px;
  }
}
</style>
