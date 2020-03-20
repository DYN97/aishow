<template>
  <div>
    <v-carousel cycle :interval="2000" height="150" hide-delimiter-background :show-arrows="false">
      <v-carousel-item v-for="(img, i) in imgs" :key="i" :src="img.src">
        <span class="ad" v-if="img.isguanggao">广告</span>
      </v-carousel-item>
    </v-carousel>
    <v-subheader isnet>{{action}}基本信息：</v-subheader>
        <v-container >
          
        </v-container>

  </div>
</template>
<script>
export default {
    name:"TicketIndex",
    data(){
        return {
            action:"订票", imgs:[
            {
                src:"http://59.110.175.131:1111/upfiles/2019-07-31/h5_20190731205844240.jpg",
                isguanggao:true
            }
            , {
                src:"http://59.110.175.131:1111/upfiles/2019-07-31/h7_20190731205944651.jpg",
                isguanggao:false
            }
            
            
        ]
        }
    }
}
</script>
<style scoped>

</style>