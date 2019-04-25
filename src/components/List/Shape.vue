<template>
  <svg
    :class="allTime"
    @click="ItemClicked()"
    style="cursor:pointer"
    width="11px"
    height="6px"
    viewBox="0 0 11 6"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g id="Template-01" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g
        id="Home-Page"
        transform="translate(-152.000000, -22.000000)"
        fill="#000"
        fill-rule="nonzero"
      >
        <g id="Header-24">
          <g id="Navigation-Menu">
            <g id="Top-Menu">
              <g id="Stacked-Group" transform="translate(30.000000, 16.000000)">
                <g transform="translate(62.000000, 0.000000)" id="Shape">
                  <path
                    d="M65.5,12 C65.2399335,12 64.979867,11.9083255 64.7817695,11.7259121 L60,7.32273152 L61.436461,6 L65.5,9.74181478 L69.563539,6 L71,7.32273152 L66.2182305,11.7259121 C66.020133,11.9083255 65.7600665,12 65.5,12 Z"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
</template>


<script>
export default {
    props:['selected'],
    methods:{
        ItemClicked(){
            this.$emit("clicked");
        }
    },
    computed:{
      allTime(){
        if(this.selected==0){
          return "select"
        }
        return ""
      }
    }
}
</script>


<style>
.select{
  transform: rotate(180deg);
}
</style>