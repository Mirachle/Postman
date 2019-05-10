<template>
  <div>
    <div class="row" style="padding:0">
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
          @clicked="deleteListItem(index)"
          @plusClicked="plusListItem(index)"
          @keyChanged="keyChanged"
          @valueChanged="valueChanged"
          :item="item"
          :index="index"
          headComp="true"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import EnvironmentList from "@/components/EnvironmentList";
export default {
  name: "HeadComp",
  components: {
    "environment-list": EnvironmentList
  }
};
</script>

<style scoped>
.list-item{
  width:100%;
  transition: all 0.2s;
  display: inline-block;
}
.listgroup-enter{
  opacity: 0;
  transform: translateY(30px);
}
.listgroup-leave-to{
  opacity: 0;
}

.listgroup-enter-active{
  transition: all 0.2s;
}
.listgroup-leave-active {
  position: absolute;
}
</style>
