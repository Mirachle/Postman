<template>
  <div class="row">
    <div class="col-md-3 col-12 line">
      <button-comp :class="[showModal ? blurClass : '', bkClass, 'line2']" buttonValue="Environment" @clicked="showModal = true"/>
      <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <modal @close="showModal = false" v-if="showModal"/>
      </transition>
      <send-list :class="[showModal ? blurClass : '', bkClass]" @clicked="clicked" :list="sendList" :activeIndex="activeIndex"/>
    </div>
    <div :class="[showModal ? blurClass : '', bkClass, 'col-md-9 col-12']">
      <input-comp @clicked="inputClicked" :activeIndex="activeIndex"/>
      <list-comp :list="list"/>
    </div>
  </div>
</template>

<script>
import InputComp from "@/components/Input/InputComp";
import ListComp from "@/components/List/ListComp";
import SendList from "@/components/SendList/SendList";
import ModalComp from "@/components/ModalComp";
import ButtonComp from '@/components/Input/ButtonComp';
import {mapActions, mapGetters} from 'vuex';
import Swal from 'sweetalert2'

export default {
  name: "MainPage",
  data() {
    return {
      itemIndex: undefined,
      activeIndex: undefined,
      showModal: false,
      modalEffect: "",
      maskEffect: "",
      bkClass: 'bk',
      blurClass: 'blur'
      };
  },

  components: {
    "input-comp": InputComp,
    "list-comp": ListComp,
    "send-list": SendList,
    "modal": ModalComp,
    'button-comp': ButtonComp,
  },

  created(){
    this.originError();
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
      'postPutPatchSaveAs'
    ]),
    send(data) {
      var url = JSON.stringify(data.url).replace(/"/g, "");
      var selected = JSON.stringify(data.method).replace(/"/g, "");
      var textArea = data.text;
      if(url != ("" | " ")){
        try {
          if ((selected == "post") || (selected == "put") || (selected == "patch")) {
            this.postPutPatchPush([selected, url, textArea])
          }
          else{
            this.getDeletePush([selected, url])
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
              this.postPutPatchSave([(result.value),selected, url, textArea])
            }else{
              this.postPutPatchSave([(result.value),selected, url])
            }
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
              this.postPutPatchSaveAs([(result.value),selected, url, this.activeIndex, textArea])
            }else{
              this.postPutPatchSaveAs([(result.value),selected, url, this.activeIndex])
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
              this.postPutPatchSave([(result.value),selected, url, textArea])
            }else{
              this.postPutPatchSave([(result.value),selected, url])
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
.line2{
  text-align: center;
  margin-bottom: 10px;
  border-style: solid;
  border-width: 0px 0px 3px 0px;
  border-color: #1111111a;
  padding-bottom: 15px;
  margin-bottom: 15px;
  margin-top: 15px;
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


