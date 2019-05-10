<template>
  <div>
    <div class="modal-body row">
      <div class="col-5" style="margin-left:-10px;">
        <p>Key:</p>
      </div>
      <div class="col-6" style="margin-left: 10px;">
        <p>Value:</p>
      </div>
    </div>
    <transition-group name="listgroup" tag="div">
      <div v-for="(item,index) in 3" :key="item" class="list-item">
        <environment-list
          @clicked="deleteListItem(index)"
          @keyChanged="keyChanged"
          @valueChanged="valueChanged"
          :item="item"
          :index="index"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import EnvironmentList from "@/components/EnvironmentList";

export default {
  name: "HeadComp",
  props: [""],
  data() {
    return {
      areaVisible: true
    };
  },

  components: {
    "environment-list": EnvironmentList
  }
};
</script>
