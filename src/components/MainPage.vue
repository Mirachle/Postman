<template>
  <div class="row">
    <div class="col-md-3 col-12 line">
      <environment-comp :showModal="showModal" @close="showModal = false" @open="showModal = true"/>
      <send-list :class="[showModal ? blurClass : '', bkClass]" @clicked="clicked" :list="sendList" :activeIndex="activeIndex"/>
    </div>
    <div :class="[showModal ? blurClass : '', bkClass, 'col-md-9 col-12']">
      <input-comp @clicked="inputClicked" :activeIndex="activeIndex" :currentList="currentList" @keyChanged="keyChanged" @valueChanged="valueChanged"/>
      <list-comp :list="list" @clearList="clearList" class="top-line"/>
    </div>
  </div>
</template>

<script>
import InputComp from "@/components/Input/InputComp";
import ListComp from "@/components/List/ListComp";
import SendList from "@/components/SendList/SendList";
import EnvironmentComp from "@/components/Environment/EnvironmentComp";
import {mapActions, mapGetters} from 'vuex';
import Swal from 'sweetalert2'

export default {
  name: "MainPage",
  data() {
    return {
      itemIndex: undefined,
      activeIndex: undefined,
      currentList: [{key: '', value: ''}],
      showModal: false,
      bkClass: 'bk',
      blurClass: 'blur',
      };
  },

  components: {
    "input-comp": InputComp,
    "list-comp": ListComp,
    "send-list": SendList,
    "environment-comp": EnvironmentComp,
  },

  created(){
    this.originError();
  },
  watch: {
    activeIndex(newValue, oldValue) {
      this.currentList = []
      if (newValue != undefined){
        var i = 0;
        while (this.sendList[newValue].headerList[i] != undefined) {
          this.currentList.push({
            key: this.sendList[newValue].headerList[i].key,
            value: this.sendList[newValue].headerList[i].value
          });
          i++;
        }
      }
      else {
        this.currentList = [{key: "", value: ""}]
      }
    }
  },

  computed: {
    ...mapGetters({
      list: 'getList',
      sendList: 'getSendList'
      })
  },

  methods: {
    ...mapActions([
      'postPutPatchPush',
      'getDeletePush',
      'handleError',
      'originError',
      'postPutPatchSave',
      'getDeleteSave',
      'postPutPatchSaveAs',
      'clearList',
    ]),
    send(data) {
      var url = JSON.stringify(data.url).replace(/"/g, "");
      var selected = JSON.stringify(data.method).replace(/"/g, "");
      var textArea = data.text;
      var list = this.currentList;
      if(url != ("" | " ")){
        try {
          if ((selected == "post") || (selected == "put") || (selected == "patch")) {
            this.postPutPatchPush([selected, url, textArea, this.currentList])
          }
          else{
            this.getDeletePush([selected, url, list])
          }
        } catch (e) {
          this.handleError([e, selected, url])
        } finally {
          this.activeIndex = undefined;
        }
      }
    },
    async save(data){
      if (this.activeIndex == undefined){
        var url = data.url;
        var selected = data.method;
        var textArea = data.text;
        Swal.fire({
          title: 'Saved name',
          input: 'text',
          inputPlaceholder: 'Enter here',
        }).then((result) => {
          if (result.value) {
            if ((selected == "post") || (selected == "put") || (selected == "patch")) {
              this.postPutPatchSave([(result.value),selected, url, this.currentList, textArea])
            }else{
              this.postPutPatchSave([(result.value),selected, url, this.currentList])
            }
            this.currentlist[i].key
          }
        })
      } else {
        var url = data.url;
        var selected = data.method;
        var textArea = data.text;
        Swal.fire({
          title: 'Saved name',
          input: 'text',
          inputValue: this.sendList[this.activeIndex].name,
          inputPlaceholder: 'Enter here',
        }).then((result) => {
          if (result.value) {
            if ((selected == "post") || (selected == "put") || (selected == "patch")) {
              this.postPutPatchSaveAs([(result.value),selected, url, this.activeIndex, this.currentList, textArea])
            }else{
              this.postPutPatchSaveAs([(result.value),selected, url, this.activeIndex, this.currentList])
            }
            this.activeIndex = undefined;
          }
        })
      }
    },
    saveAs(data){
      if (this.activeIndex != undefined){
        var url = data.url;
        var selected = data.method;
        var textArea = data.text;
        Swal.fire({
          title: 'Saved name',
          input: 'text',
          inputPlaceholder: 'Enter here',
        }).then((result) => {
          if (result.value) {
            if ((selected == "post") || (selected == "put") || (selected == "patch")) {
              this.postPutPatchSave([(result.value),selected, url, this.currentList, textArea])
            }else{
              this.postPutPatchSave([(result.value),selected, url, this.currentList])
            }
            this.activeIndex = undefined;
          }
        })
      }
    },

    inputClicked(data){
      if (data.buttonType == 'SEND'){
        this.send(data);
      } else if (data.buttonType == 'SAVE'){
        this.save(data);
      } else {
        this.saveAs(data);
      }
    },

    clicked(index){
      if (this.activeIndex == index) {
        this.activeIndex = undefined;
      } else {
        this.activeIndex = index;
      }
    },
    keyChanged(key, index){
      this.currentList[index].key = key;
    },
    valueChanged(value, index){
      this.currentList[index].value = value;
    },
  }
};

/*
https://jsonplaceholder.typicode.com/posts
{
"id": 1,
"title": "foo",
"body": "bar",
"userId": 1
}
*/
</script>

<style scoped>
.bk {
  transition: all 0.1s ease-out;
}

.blur {
  filter: blur(1px);
  opacity: 0.4;
}
.top-line{
  border-style: solid;
  border-width: 3px 0px 0px 0px;
  border-color: #1111111a;
  margin-top: 10px;
  padding-top: 10px;
}

.line{
  border-style: solid;
  border-width: 0px 3px 0px 0px;
  border-color: #1111111a;
  right: 15px;
}

@media (max-width: 767.9px) {
  .line{
    border-width: 0px 0px 0px 0px;
    border-color: #ffffff00;
    right: 0px;
    margin-bottom: 10vh;
  }
}
</style>


