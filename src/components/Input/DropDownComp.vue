<template>
  <div class="btn-group">
    <button
      type="button"
      class="btn dropdown-toggle dropdown-class"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >{{this.selectedName}}</button>
    <div class="animated fadeIn dropdown-menu" style="padding:0">
      <a class="dropdown-item" href="#" @click="requestClicked('post')">POST</a>
      <a class="dropdown-item" href="#" @click="requestClicked('get')">GET</a>
      <a class="dropdown-item" href="#" @click="requestClicked('patch')">PATCH</a>
      <a class="dropdown-item" href="#" @click="requestClicked('delete')">DELETE</a>
      <a class="dropdown-item" href="#" @click="requestClicked('put')">PUT</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DropDownComp",
  props: ["index"],
  data() {
    return {
      selected: "post",
      selectedName: "POST"
    };
  },
  methods: {
    requestClicked(value) {
      this.selected = value;
      this.selectedName = value.toUpperCase();
      this.$emit("selected", this.selected);
    }
  },
  computed: {
    ...mapGetters({
      sendList: "getSendList"
    })
  },
  watch: {
    index(newValue, oldValue) {
      this.selected = this.sendList[newValue].type;
      this.selectedName = this.selected.toUpperCase();
      this.$emit("selected", this.selected);
    }
  }
};
</script>


<style scoped>
.dropdown-class{
  height:30px;
  background-color: #1111111a;
  border:none;
  padding-bottom:0;
  padding-top:0;
  color:black;
  font-weight: 600;
  outline: none;
}
.dropdown-class:active{
  background-color: #1111111a;
}

.btn-group{
  margin-left: -10px;
  height:30px;
  justify-content:center
}
</style>
