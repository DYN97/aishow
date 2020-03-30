<template>
  <div></div>
</template>
<script>
export default {
  name: "oath",
  data(){
    return {

    }
  },
  beforeRouteEnter: (to, from, next) => {
    if (to.query.token) {
      sessionStorage.setItem("islogin", true);
      sessionStorage.setItem("token", to.query.token); 
      next(to.query.to);     
    } else {
      next(vm => {
        vm.$api.userapi.oath(to.query.from).then(res => {
          window.location.href = res.data;
        });
      });
    }
  }
};
</script>