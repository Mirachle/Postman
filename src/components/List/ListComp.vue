<template>
<div class="row">
    <div v-for="(item,index) in list" :key="index">
       <item-comp :item="item" />
    </div>
</div>
</template>

<script>
import ItemComp from "@/components/List/ItemComp"
export default {
    name:'ListComp',
    props:["list"],
    components:{
        'item-comp': ItemComp
    },
}
</script>

<style scoped>

</style>
