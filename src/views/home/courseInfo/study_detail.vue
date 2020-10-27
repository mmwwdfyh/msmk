<template>
  <div>
    <van-nav-bar :title="course.title" left-arrow @click-left="onClickLeft">
      <!-- <template #right>
          <svg class="icon" @click="showPopup" aria-hidden="true">
            <use xlink:href="#icon-fenxiang" />
          </svg>
      </template>-->
    </van-nav-bar>

    <div class="box">
      <p>共1课时</p>
      <div class="info">
          <van-progress
                :percentage="100"
                :stroke-width="8"
                color="#ea5b00"
                :show-pivot="false"
              />
      </div>
      <p>已学习{{course.progress_rate}}%</p>
    </div>

    <div class="list">
      <ul>
        <li v-on:click="video(item)" v-for="(item,index) in periods" :key="index">
          <p>{{ item.periods_title }}</p>

          <div>
            <div class="info">
              <van-progress
                :percentage="item.progress_rate"
                :stroke-width="8"
                color="#ea5b00"
                :show-pivot="false"
              />
            </div>
            <p>已学习{{item.progress_rate}}%</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { myStudy } from "../../../http/api";
export default {
  data() {
    return {
      course: "", //头部
      periods: "" //列表
    };
  },
  created() {
    console.log(this.$route.params.id);
    let id = this.$route.params.id;
    myStudy(id).then(res => {
      console.log(res);
      this.course = res.data.data.course;
      this.periods = res.data.data.periods;
    });
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //跳转视频页面
    video(item){
      console.log(item)
      this.$router.push({
        path:`/video/${item.periods_title}`,
        query:{
          course_id:this.$route.params.id,
          video_id:item.video_id
        }
      })
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
.box {
  height: 107px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > p {
    font-size: 28px;
    color: #6b6b6b;
  }
}
.info {
  width: 417px;

  // justify-content: space-around;
  // align-items: center;
}

.list {
  width: 750px;
  display: flex;
  flex-direction: column;

  align-items: center;
  > ul {
    > li {
      width: 690px;
      height: 210px;
      border: 1px solid #e9e9e9;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 30px;
      box-sizing: border-box;
      > p {
        font-size: 21px;
        color: #8c8c8c;
        line-height: 50px;
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > p {
          font-size: 26px;
          color: #9b9b9b;
        }
      }
    }
  }
}
</style>
