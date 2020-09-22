<template>
  <div></div>
</template>
<script>
export default {
  name: "waiting",
  data() {
    time: "";
  },
  methods: {
    cd() {
      let cd = setInterval(() => {
        this.time -= 20;
        if (this.CountDown == 0) {
          clearInterval(cd);
          this.YZMloading = false;
          this.CountDown = 60;
        }
      }, 1000);
    },
  },
};
</script>