<template>
  <div class="home">
     <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            > <router-link to="/exhibitionList">普通观众订票</router-link></v-col>
          </v-row>
   <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            > <router-link to="/exhibitionList?type=vip">VIP观众订票</router-link></v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            > <router-link to="/Orderlist">订单列表</router-link></v-col>
          </v-row>
           <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
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
