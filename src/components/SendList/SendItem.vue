<template>
  <div class="row">
    <input @click="$emit('clicked', index)" type="button" :value="item.name">
    <ic-delete @clicked="sendListDelete(index)" :r="30" class="ic-delete"/>
  </div>
</template>

<script>
import IcDelete from "@/components/SendList/IcDelete";
import { mapActions } from 'vuex';

export default {
  name: 'SendItem',
  props: ['item', 'index'],
  components: {
    "ic-delete": IcDelete,
  },
  methods: {
    ...mapActions([
      'sendListDelete'
    ])
  }
};
</script>

<style scoped>
input {
  border: 0px;
  border-radius: 15px;
  background-color: #11111113;
  font-weight: 600;
  padding: 3px;
  padding-right: 10px;
  padding-left: 10px;
  cursor: pointer;
  margin: 2%;
  left: 0px;
  max-width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row{

  border: 0px;
  border-radius: 8px;
  background-color: #1111111a;
  padding: 3px;
  padding-right: 10px;
  padding-left: 10px;
  margin: 2%;
  position: relative;
  display: flex;
  align-items: center;
}

.ic-delete{
  position: absolute;
  margin-right: 10px;
  right: 0px;
}
</style>
