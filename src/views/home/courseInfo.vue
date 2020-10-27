<template>
  <div>
    <!-- 头部 -->
    <div class="box">
      <van-nav-bar title="课程详情" left-arrow @click-left="onClickLeft">
        <template #right>
          <svg class="iconn" @click="showPopup" aria-hidden="true">
            <use xlink:href="#icon-fenxiang" />
          </svg>
        </template>
      </van-nav-bar>
      <van-popup v-model="show">
        <div>
          <p class="shark">分享</p>
          <img :src="imrUrl" />
        </div>
      </van-popup>
      <!-- 标题区域 -->

      <div class="header">
        <div>
          <p>{{ title.title }}</p>
          <p>{{ title.price |price }}</p>
          <p>
            共 {{ title.status }} 课时
            <span></span>
            <span>{{ title.sales_num }} 已经报名</span>
          </p>
        </div>
        <svg class="icon" v-on:click="collectBtn" aria-hidden="true">
          <use :xlink:href="icon" />
        </svg>
      </div>
      <!-- 教学团队 -->
      <div class="info">
        <dl v-for="(item,index) in info" :key="index">
          <dt>教学团队</dt>
          <dd>
            <img :src=" item.teacher_avatar " alt />
            <p>{{ item.teacher_name }}</p>
          </dd>
        </dl>
      </div>

      <!-- 课程介绍 -->
      <div class="course_details">
        <dl>
          <dt>课程介绍</dt>
          <dd v-html=" title.course_details  "></dd>
        </dl>
      </div>

      <!-- 课程大纲 -->
      <div class="courseChapter">
        <dl>
          <dt>课程大纲</dt>
          <dd v-for="(item,index) in courseChapter" :key="index">{{ item.periods_title }}</dd>
        </dl>
      </div>

      <!-- 课程评价 -->
      <div class="courseComment">
        <dl>
          <dt>课程评价</dt>
          <dd v-for="(item,index) in courseComment" :key="index">
            <img :src="item.avatar" alt />
            <div class="courseComment_box">
              <div>
                <span>{{ item.nickname }}</span>
                <van-rate
                  v-model="item.grade"
                  :size="15"
                  color="#ffd21e"
                  void-icon="star"
                  void-color="#eee"
                  :disabled="ttt"
                  disabled-color="#ea7a2f"
                />
                <p>{{ item.created_at | time }}</p>
              </div>
              <span>{{ item.content }}</span>
            </div>
          </dd>
        </dl>
      </div>

      <!-- 立即报名 -->
      <button class="btn" v-on:click="Order">{{ downOrder }}</button>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
import {
  courseInfo,
  collect,
  collectme,
  courseChapter,
  courseComment,
  cancelme,
  // 立即报名
  downOrder,
  shopInfo
} from "../../http/api";

export default {
  data() {
    return {
      ttt: true,
      title: "",
      info: "", //教学团队,
      courseChapter: "", //课程大纲
      courseComment: "",
      icon: "#icon-tubiaozhizuomoban",
      show: false,
      imrUrl: "",
      downOrder: "立即报名" //立即报名
    };
  },

  created() {
    //请求头部信息接口

    courseInfo(this.$route.params.id).then(res => {
      console.log(res);
      if (res.data.data.info.is_buy == 0) {
        this.downOrder = "立即报名 ";
      } else {
        this.downOrder = "立即学习";
      }
      if (res.data.data.info.is_collect == 0) {
        this.icon = "#icon-tubiaozhizuomoban ";
      } else if (res.data.data.info.is_collect == 1) {
        this.icon = "#icon-star";
      }
      console.log(res.data.data.info.is_collect);
      this.title = res.data.data.info;
      this.info = res.data.data.teachers;
    });

    //课程大纲

    courseChapter({ id: this.$route.params.id }).then(res => {
      this.courseChapter = res.data.data;
    });

    // 课程评价
    let data = {
      page: 1,
      limit: 10,
      id: this.$route.params.id
    };
    courseComment(data).then(res => {
      this.courseComment = res.data.data.list;
    });
  },
  filters: {
    //   过滤钱
    price(val) {
      if (val < 1) {
        return "免费";
      } else {
        return ` ${val / 100}.00`;
      }
    },
    time(val) {
      //时间戳

      let date = new Date(val * 1000);
      let y = date.getFullYear();
      let m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let min =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

      let result = "";
      result = `${y}-${m}-${d} ${h}:${min}`;

      return result;
    }
  },

  mounted() {},
  watch: {},
  computed: {},

  methods: {
    //分享
    showPopup() {
      this.show = true;
      let urll = location.href;
      console.log(urll);
      QRCode.toDataURL(urll)
        .then(url => {
          console.log(url);
          this.imrUrl = url;
        })
        .catch(err => {
          console.error(err);
        });
    },
    //点击回退
    onClickLeft() {
      this.$router.go(-1);
    },

    //点击收藏按钮
    collectBtn() {
      let id = this.title.id;
      let dat = {
        course_basis_id: id,
        type: 1
      };

      if (this.title.is_collect == 0) {
        // 收藏

        collectme(dat).then(res => {
          console.log(res);
          this.icon = "#icon-star";
        });
      } else if (this.title.is_collect == 1) {
        cancelme(this.title.collect_id).then(res => {
          this.icon = "#icon-tubiaozhizuomoban";
        });
      }
    },
    //点击立即报名

    Order() {
      let id = this.title.id;

      let data = {
        shop_id: id,
        type: 5
      };
      console.log(this.title);
      if (this.title.price == 0) {
        if (this.title.is_buy == 0) {
          this.downOrder = "立即学习";
          downOrder(data).then(res => {
            console.log(res);
          });
        } else {
          console.log(id)
          this.$router.push({
            path: `/study_detail/${id}`
          });
        }
      } else {
        shopInfo(data).then(res => {});
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.shark {
  text-align: center;
}
/deep/.van-nav-bar__title {
  font-size: 35px;
  color: #aaa;
}
/deep/.van-icon-arrow-left::before {
  font-size: 40px;
  color: #aaa;
}
/deep/.van-icon-search::before {
  font-size: 52px;
}
.van-nav-bar {
  height: 85px;
}
.icon {
  position: absolute;
  right: 30px;
  top: 23px;
}
.box {
  background-color: #f0f2f5;
  height: 100%;
  padding-bottom: 100px;
}
.btn {
  width: 100%;
  height: 100px;
  background-color: #eb6100;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1111;
  border: 2px solid #aaa;
  color: #fff;
  font-weight: bold;
}
//头部
.header {
  width: 750px;
  height: 268px;
  background-color: #fff;
  padding: 32px;
  box-sizing: border-box;
  position: relative;
  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > p:nth-child(1) {
      font-size: 30px;
      color: #717171;
      padding-right: 60px;
    }
    > p:nth-child(2) {
      font-size: 35px;
      color: #ee7824;
    }
    > p:nth-child(3) {
      font-size: 25px;
      color: #a3a3a3;
    }
  }
}

//教学团队
/deep/.iconn {
  width: 50px;
  height: 50px;
  color: #aaa;
}
.info {
  width: 750px;
  height: 268px;
  background-color: #fff;
  padding: 32px;
  box-sizing: border-box;
  margin: 30px 0;
  > dl {
    > dt {
      font-size: 30px;
      color: #000;
      height: 60px;
      line-height: 60px;
    }
    > dd {
      width: 140px;
      height: 140px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 77px;
        height: 77px;
        border-radius: 100%;
      }
      > p {
        font-size: 28px;
        color: #808080;
      }
    }
  }
}

// 课程介绍
.course_details {
  width: 750px;
  height: 187px;
  background-color: #fff;
  padding: 32px;
  box-sizing: border-box;
  margin-bottom: 20px;
  > dl {
    > dt {
      font-size: 30px;
      color: #000;
      height: 60px;
      line-height: 60px;
    }
    > dd {
      padding-left: 12px;
      box-sizing: border-box;
      font-size: 30px;
      color: #000;
    }
  }
}

//课程大纲

.courseChapter {
  width: 750px;

  background-color: #fff;
  padding: 32px;
  box-sizing: border-box;
  > dl {
    > dt {
      font-size: 30px;
      color: #000;
      height: 60px;
      line-height: 60px;
    }
    > dd {
      font-size: 23px;
      color: #adadad;
      padding-left: 70px;
      line-height: 70px;
    }
  }
}

// 评价
.courseComment {
  width: 750px;
  background-color: #fff;
  padding: 32px;
  box-sizing: border-box;
  margin-top: 20px;

  > dl {
    > dt {
      font-size: 30px;
      color: #000;
      height: 60px;
      line-height: 60px;
    }
    > dd {
      width: 680px;
      height: 112px;
      display: flex;
      // justify-content: space-between;
      > .courseComment_box {
        width: 615px;
        > span {
          font-size: 27px;
          color: #a5a5a5;
        }
        > div {
          display: flex;
          justify-content: space-between;
          > span {
            font-size: 25px;
            height: 30px;
          }
          > p {
            font-size: 18px;
            color: #a5a5a5;
          }
        }
      }
      > img {
        border-radius: 100%;
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
