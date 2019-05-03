<template>
  <div>
    <input-row @selectedChange="selected" @send="send" @save="save" />
    <text-area v-if="areaVisible" :areaValue="areaValue" @areaChanged="areaChanged"/>
  </div>
</template>

<script>
import InputRow from '@/components/Input/InputRow';
import TextArea from '@/components/Input/TextArea';

export default {
  name: 'InputComp',
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
      this.areaValue = ''
    }
  },
};
</script>
