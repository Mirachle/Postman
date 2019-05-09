<template>
  <div :class="['modal-mask', 'animated', maskEffect]">
    <div :class="['modal-wrapper', 'animated', modalEffect]">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{title}}</h3>
        </div>

        <div class="modal-body row">
          <div class="col-5" style="margin-left:-10px;">
            <p>Key:</p>
          </div>
          <div class="col-6" style="margin-left: 10px;">
            <p>Value:</p>
          </div>
        </div>
        <transition-group name="listgroup" tag="div">
          <div v-for="(item,index) in currentEnvironmentList" :key="item" class="list-item">
            <environment-list
              @clicked="removeElementFromCurrentList(index)"
              @keyChanged="keyChanged"
              @valueChanged="valueChanged"
              :item="item"
              :index="index"
            />
          </div>
        </transition-group>
        <div class="modal-footer" style="border:none">
          <input type="button" @click="modalSave" value="Save">
          <input type="button" @click="modalAdd" value="New Row">
          <input type="button" @click="$emit('close')" value="Cancel">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnvironmentList from "@/components/EnvironmentList";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "ModalComp",
  props: ["maskEffect", "modalEffect"],
  data() {
    return {
      title: "Environment",
      currentEnvironmentList: []
    };
  },
  mounted() {
    var i = 0;
    while (this.list[i] != undefined) {
      this.currentEnvironmentList.push({
        key: this.list[i].key,
        value: this.list[i].value
      });
      i++;
    }
  },
  components: {
    "environment-list": EnvironmentList
  },
  computed: {
    ...mapGetters({
      list: "getEnvironmentList"
    })
  },
  methods: {
    ...mapActions(["environmentListPush"]),
    ...mapMutations(["environmentListSave"]),
    modalSave() {
      this.environmentListSave(this.currentEnvironmentList);
      this.$emit("close");
    },
    modalAdd() {
      this.currentEnvironmentList.push({
        key: "",
        value: ""
      });
    },
    removeElementFromCurrentList(index) {
      this.currentEnvironmentList.splice(index, 1);
    },
    keyChanged(key, index) {
      this.currentEnvironmentList[index].key = key;
    },
    valueChanged(value, index) {
      this.currentEnvironmentList[index].value = value;
    }
  }
};
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s;
  text-align: left;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;position: relative;
}

.modal-header {
  border: none;
  padding: 0px;
  justify-content: center;
  margin-top: 0;
}

.modal-body {
  margin: 0px 0;
  padding: 0;
}

p {
  margin-top: 16px;
  margin-bottom: 16px;
}

.modal-default-button {
  float: right;
}

input[value="Save"] {
  background-color: rgb(7, 180, 248);
  border: 2px solid rgb(7, 180, 248);
  color: white;
  border-radius: 10%;
  transition-duration: 0.4s;
  cursor: pointer;
}

input[value="Save"]:hover {
  background-color: white;
  color: rgb(7, 180, 248);
  border: 2px solid rgb(7, 180, 248);
}

input[value="New Row"] {
  background-color: #66cdaa;
  border: 2px solid #66cdaa;
  color: white;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5%;
}

input[value="New Row"]:hover {
  background-color: white;
  color: #66cdaa;
  border: 2px solid #66cdaa;
}

input[value="Cancel"] {
  background-color: rgb(121, 120, 120);
  border: 2px solid rgb(121, 120, 120);
  transition-duration: 0.4s;
  color: white;
  cursor: pointer;
  border-radius: 5%;
}

input[value="Cancel"]:hover {
  background-color: white;
  border: 2px solid rgb(121, 120, 120);
  color: rgb(121, 120, 120);
}

.left {
  margin-top: 5vh;
  text-align: left;
}


.list-item{
  width:100%;
  transition: all 1s;
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
  transition: all 1s;
}
.listgroup-leave-active {
  position: absolute;
}

</style>
