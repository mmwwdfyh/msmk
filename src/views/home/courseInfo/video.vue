<template>
  <div>
    <van-nav-bar :title="this.$route.params.title" left-arrow @click-left="onClickLeft">
 
    </van-nav-bar>

    <div id="video"></div>
  </div>
</template>

<script>
import { video } from "../../../http/api";
export default {
  data() {
    return {
      token: ""
    };
  },
  created() {
  
    video(this.$route.query).then(res => {
    
      var player = new bjcPlayer("#video", {
        token: res.data.data.token, //后台返回的id名字
        definition: "low" // hign 高清 low 低清
      });
      player.play(res.data.data.video_id); // 播放视频(vid为视频id)
    });
  },

  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar__title {
  font-size: 35px;
  color: #000;
}
/deep/.van-icon-arrow-left::before {
  font-size: 40px;
  color: #000;
}
/deep/.van-icon-search::before {
  font-size: 52px;
}
.van-nav-bar {
  height: 85px;
}

#video{
    width: 100%;
    height: 500px;
}
/deep/.switch-definition.switch-definition {
    display: none;
}
</style>
