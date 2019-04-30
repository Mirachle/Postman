<template>
  <div>
    <input-row @selectedChange="selected" @sendUrl="sendUrl" @send="send"/>
    <text-area ref="textArea" v-if="areaVisible" @area="area"/>
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
    };
  },

  components: {
    'input-row': InputRow,
    'text-area': TextArea,
  },
  methods: {
    selected(value) {
      this.$emit('selected', value);
      if ((value === 'get') || value === 'delete') {
        this.areaVisible = false;
      } else {
        this.areaVisible = true;
      }
    },
    sendUrl(url) {
      this.$emit('sendUrl', url);
    },
    area(value) {
      this.$emit('area', value);
    },
    send(){
      this.$refs.textArea.clearArea();
      this.$emit('send');
    }
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
