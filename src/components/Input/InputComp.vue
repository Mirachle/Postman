<template>
  <div>
    <input-row :index="index" @selectedChange="selected" @send="send" @save="save" />
    <text-area v-if="areaVisible" :areaValue="areaValue" @areaChanged="areaChanged"/>
  </div>
</template>

<script>
import InputRow from '@/components/Input/InputRow';
import TextArea from '@/components/Input/TextArea';
import { mapGetters } from 'vuex';

export default {
  name: 'InputComp',
  props: ['index'],
  data() {
    return {
      areaVisible: true,
      areaValue: '',
    };
  },

  components: {
    'input-row': InputRow,
    'text-area': TextArea,
  },
  computed: {
    ...mapGetters({
      sendList: 'getSendList'
      })
  },
  watch:{
   index(newValue,oldValue){
      this.areaValue = this.sendList[newValue].bodyValue;
   }
  },

  methods: {
    selected(value) {
      if ((value === 'get') || value === 'delete') {
        this.areaVisible = false;
      } else {
        this.areaVisible = true;
      }
    },
    areaChanged(value) {
      this.areaValue = value;
    },
    send(data){
      this.$emit('send',{
        url: data.url,
        method: data.method,
        text: this.areaValue
      });
      this.areaValue = ''
    },
    save(data){
       this.$emit('save',{
        url: data.url,
        method: data.method,
        text: this.areaValue
      });
    }
  },
};
</script>
