<template>
  <div class="set_message">
    <van-nav-bar title="信息填写" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
onClickLeft(){
    this.$router.go(-1)
}

  }
};
</script>

<style lang="scss" scoped>
body,
html {
  height: 100%;
}
.set_message {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1111;
}
.van-nav-bar {
  height: 100px;
}
/deep/.van-nav-bar__title {
  font-size: 40px;
}
/deep/.van-icon-arrow-left::before{
    font-size: 40px;
}
</style>
