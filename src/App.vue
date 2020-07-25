<template>
  <v-app>    
    <v-content class="body">
      <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"/>
    </v-content>
  </v-app>
</template>

<style lang="scss">
  .body{
    background-color: #f2f2f2;
  }
</style>
