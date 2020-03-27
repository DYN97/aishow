<template>
      <v-carousel cycle :interval="2000" height="150" hide-delimiter-background :show-arrows="false">
      <v-carousel-item v-for="(img, i) in imgs" :key="i" :src="img.src">
        <span class="ad" v-if="img.isguanggao">广告</span>
      </v-carousel-item>
    </v-carousel>

</template>
<script>
export default {
    name:"airshowCarousel",
    data(){
      return {

      }
    },props:{
      imgs:Array
    }
}
</script>


<style scoped>
.ad {
    color:rgba(255,255,255,0.4);
    position:absolute;
    bottom:20px;
    right:10px;
    font-size:10px;
}
</style>