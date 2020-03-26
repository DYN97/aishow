<template>
<div>
     <v-carousel
    cycle
    :interval="2000"
    height="150"
    hide-delimiter-background
    :show-arrows="false"
  >
    <v-carousel-item
      v-for="(img, i) in imgs"
      :key="i"
       :src="img.src"
    >
    <span class="ad" v-if="img.isguanggao">广告</span>
    </v-carousel-item>
  </v-carousel>
   <v-list three-line class="listbox">
      <template v-for="(item, index) in items">
        <v-divider
          v-if="index>0"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item @click="toDetail(item.exhibition_code,item.exhibition_type,item.jump_url)"
          :key="item.title"
        >
          <v-list-item-avatar :size="80">
            <v-img :src="item.cover_photo"></v-img>
          </v-list-item-avatar>

          <v-list-item-content style="margin-left:20px">
            <v-list-item-title style="white-space:unset;font-size:18px" v-html="item.exhibition_name"></v-list-item-title>
            <v-list-item-subtitle>{{item.begin_time}}-{{item.end_time}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline" style="text-align:center">温馨提示</v-card-title>
        <v-card-actions>
 <v-card-text>
          服务准备中，敬请期待！
        </v-card-text>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            返回
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
export default {
  name: 'ExhibitionList',
   data () {
      return {
        imgs:[
            {
                src:"http://59.110.175.131:1111/upfiles/2019-07-31/h5_20190731205844240.jpg",
                isguanggao:true
            }
            , {
                src:"http://59.110.175.131:1111/upfiles/2019-07-31/h7_20190731205944651.jpg",
                isguanggao:false
            }
            
            
        ],items: [],dialog:false
        
      }
   },mounted(){
     var me = this;
     this.$api.exhibitionapi.GetExhibitionList().then(res=>{
       if(res.status=="200"){
         if(res.data.statusCode=="200"){
           if(res.data.data&&res.data.data.length>0){
              me.items = res.data.data;
           }
         }
       }
     });


   },methods:{
     toDetail(exhibition_code,type,url){
       switch(type){
         case 0:console.log('正常;');
          this.$router.push({
            path: "TicketIndex", query: {exhibition_code:exhibition_code }
          });       
         break;
         case 1:console.log('筹备;');this.dialog=true;break;
         case 2:location.href = url;break;
       }

     }
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
.listbox{
  height: calc(100vh - 150px);
  overflow: auto;
}
</style>