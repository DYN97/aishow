<template>
  <div class="home">
     <v-row no-gutters>
            <v-col
              align-self="center"
              class="home-button"
              for="doc-ipt-3"
            > <router-link to="/exhibitionList">普通观众订票</router-link></v-col>
          </v-row>
   <v-row no-gutters>
            <v-col
              align-self="center"
              class="home-button"
              for="doc-ipt-3"
            > <router-link to="/exhibitionList?type=vip">VIP观众订票</router-link></v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              align-self="center"
              class="home-button"
              for="doc-ipt-3"
            > <router-link to="/Orderlist">订单列表</router-link></v-col>
          </v-row>
           <v-row no-gutters>
            <v-col
              align-self="center"
              for="doc-ipt-3"
              class="home-button"
            > <router-link to="/MailList">邮寄列表</router-link></v-col>
          </v-row>
    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
<style scoped>
    .home-button{
        display: block;
        width: calc(100% - 40px);
        height: 55px;
        line-height: 55px;
        background: #0f9ae0;
        margin: 20px 20px 0;
        text-align: center;
        border-radius: 6px;
    }
    .home-button a{
        font-size: 18px;
        color: #fff;
        display: block;
        width: 100%;
    }
</style>
