<template>
  <div>
    <div class="modal-body row" style="padding:0">
      <div class="col-5">
        <p>Key:</p>
      </div>
      <div class="col-6">
        <p>Value:</p>
      </div>
    </div>
    <transition-group name="listgroup" tag="div">
      <div v-for="(item,index) in 3" :key="item" class="list-item">
        <environment-list
          @clicked="deleteHeadListItem(index)"
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
