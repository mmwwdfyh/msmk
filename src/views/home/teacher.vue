<template>
  <div class="box">
    <div class="header">
      <van-nav-bar title="讲师详情" left-arrow @click-left="onClickLeft" />
      <div class="header_info">
        <img :src="list.avatar" alt />
        <div>
          <p>
            {{ list.teacher_name }}
            <span>{{ list.level_name }}</span>
          </p>
          <p>
            {{ list.sex | sex }}
            <span>{{ list.teach_age}} 年教学年龄</span>
          </p>
        </div>
        <button v-on:click="flagBtn" class="flagBtn">{{ falgText }}</button>
      </div>
    </div>
    <!-- 选项卡 -->
    <div class="tab">
      <van-tabs v-model="activeName">
        <!-- 讲师介绍 -->
        <van-tab title="讲师介绍" name="a">
          <div class="infobox">
            <dl v-for="(item,index) in info" :key="index">
              <dt>{{ item.attr_name }}</dt>
              <dd v-for="(item,index) in item.attr_value" :key="index">{{ item.attr_value_name }}</dd>
            </dl>

            <dl>
              <dt>老师简介</dt>
              <dd>{{teacherinfotitle}}</dd>
            </dl>
          </div>
        </van-tab>

        <!-- 主讲课程 -->
        <van-tab title="主讲课程" name="b">
          <div class="record">
            <dl>
              <dt></dt>

              <dd  v-on:click="courseInfo(item.id)"  v-for="(item,index) in mainCourse" :key="index">
                <strong>{{ item.title}}</strong>
                <p>{{ item.total_periods | time }}</p>
                <div class="teacher" v-for="(item,index) in item.teachers_list" :key="index">
                  <img :src="item.teacher_avatar" alt />
                  <span>{{ item.teacher_name }}</span>
                </div>
                <div class="num">
                  <p>{{ item.sales_num | num }}</p>
                  <p>{{ item.price |price}}</p>
                </div>
              </dd>
            </dl>
          </div>
        </van-tab>
        <!-- //评价 -->
        <van-tab title="学院评价" name="c">
          <van-empty v-show="isShow" description="暂无评论" />
          <div v-show="!isShow" class="comment">
            <!-- //上方折叠框 -->
            <div>
              <div class="aaa" :class="{ active :active == 1 }">
                <div v-for="(item,index) in commentHeader " :key="index">
                  {{ item.title }}
                  <span>( {{ item.count }} )</span> ·
                </div>
              </div>

              <svg class="icon" v-on:click="btn" aria-hidden="true">
                <use :xlink:href="icon" />
              </svg>
            </div>
            <!-- 评价 -->
            <dl v-for="(item,index) in comment" :key="index">
              <dt>
                <img :src="item.avatar" alt />
              </dt>
              <dd>
                <van-rate
                  v-model="item.grade"
                  :size="15"
                  color="#ffd21e"
                  void-icon="star"
                  void-color="#eee"
                  :disabled="ttt"
                  disabled-color="#ea7a2f"
                />

                <div class="list">
                  <p v-for="(item,index) in item.tag_content.split(',')" :key="index">{{ item }}</p>
                </div>
                <p>{{ item.content }}</p>
              </dd>
            </dl>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <button v-on:click="oto_plan">立即预约</button>
  </div>
</template>

<script>
import { teacher, collect } from "../../http/api";
import { teacherinfo, mainCourse, comment, flag } from "../../http/api";
export default {
  data() {
    return {
      icon: "#icon-xialajiantouxiao",
      list: "",
      teacherinfo: "",
      teacherinfotitle: "",
      activeName: "a",
      info: "",
      isShow: true,
      mainCourse: "",
      ttt: true,

      //    学生评价
      comment: "",
      hidd: false,

      // 评价列表
      commentHeader: "",
      active: 0,
      falg: true,
      falgText: "关注",
      type: 1
    };
  },
  created() {
    teacher(this.$route.params.id).then(res => {

      this.list = res.data.data.teacher;
      if (res.data.data.flag == 1) {
        this.falgText = "已关注";
      } else if (res.data.data.flag == 2) {
        this.falgText = "关注";
      }
    });

    //讲师简介
    teacherinfo(this.$route.params.id).then(res => {
      this.teacherinfo = res.data.data;
      this.teacherinfotitle = this.teacherinfo.intro;
      this.info = this.teacherinfo.attr.splice(-2);
    });

    //主讲课程
    let data = { page: 1, limit: 10, teacher_id: this.$route.params.id };

    mainCourse(data).then(res => {
      this.mainCourse = res.data.data.list;
    });

    //学生评价

    comment(data).then(res => {
      // 空状态显示隐藏
      if (res.data.data.comment.list.length > 0) {
        this.isShow = false;
      }
      this.comment = res.data.data.comment.list;
      this.commentHeader = res.data.data.tag;
    });

    //  flag().then(res => {
    //          console.log(res.data.data.flag )

    //   });
  },

  filters: {
    //局部过滤器
    time(val) {
      return ` 共${val}课时 `;
    },

    sex(val) {
      if (val == 0) {
        return "男";
      } else {
        return "女";
      }
    },
    num(val) {
      return ` ${val}已报名 `;
    },
    price(val) {
      if (val < 1) {
        return "免费";
      } else {
        return ` ${val / 100}.00 `;
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //评价隐藏限时
    btn() {
      this.hidd = !this.hidd;

      if (this.hidd) {
        this.icon = "#icon-shouqijiantouxiao";
        this.active = 1;
      } else {
        this.active = 0;
        this.icon = "#icon-xialajiantouxiao";
      }
    },
 courseInfo(id) {
      this.$router.push({
        path: `courseInfo/${id}`
      });
    },
    //关注
    flagBtn() {
      
      teacher(this.$route.params.id).then(res => {
 
        this.list = res.data.data.teacher;
        if ((res.data.data.flag = 1)) {
          this.falgText = "已关注";
        } else if ((res.data.flag = 2)) {
          this.falgText = "关注";
        }
      });

      flag(this.$route.params.id).then(res => {
        if (res.data.data.flag == "2") {
          this.falgText = "关注";
        } else {
          this.falgText = "已关注";
        }
      });

    },

    // 跳转到预约
    oto_plan(){
      console.log(this.list)
      this.$router.push({
        path:`/oto_plan/${this.list.id}`
      })
    }
  }
};
</script>

<style lang='scss' scoped>
/deep/.van-nav-bar__title {
  font-size: 40px;
  color: #fff;
  border: 0;
}
/deep/.van-icon-arrow-left::before {
  font-size: 40px;
  color: #fff;
  border: 0;
}
/deep/.van-icon-search::before {
  font-size: 52px;
  border: 0;
}
.van-nav-bar {
  height: 85px;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}
.van-empty {
  height: 600px;
}
/deep/.van-empty__description {
  font-size: 42px;
  color: #aaa;
}
/deep/.van-empty__image {
  width: 270px;
  height: 270px;
}

.box {
  background-color: #f0f2f5;

  > button {
    width: 100%;
    height: 100px;
    background: #eb6100;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 11111;
    border: 0;
    color: #fff;
    font-weight: bold;
  }
}
.icon {
  font-size: 50px;
  position: absolute;
  top: 100px;
  right: 30px;
}
// 头部样式
.header {
  width: 750px;
  height: 200px;
  background-color: #5fabf9;
  position: relative;
  > .header_info {
    height: 180px;
    width: 711px;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    left: 18px;
    bottom: -66px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    > img {
      width: 80px;
      height: 80px;
      border-radius: 100%;
    }
    > div {
      width: 400px;
      > p:nth-child(1) {
        font-size: 34px;
        > span {
          font-size: 28px;
          color: #eb711b;
        }
      }
      > p:nth-child(2) {
        font-size: 22px;
        color: #aeaeae;
        margin-top: 18px;
      }
    }
    > button {
      width: 129px;
      height: 50px;
      background-color: #ebeefe;
      border-radius: 50px;
      border: 0;
      color: #eb711b;
    }
  }
}

.tab {
  padding-top: 94px;
}

/deep/.van-tabs--line .van-tabs__wrap {
  height: 87px;
}
/deep/.van-tab__text--ellipsis {
  font-size: 33px;
  overflow: inherit;
}

.infobox {
  > dl {
    display: flex;
    margin-top: 48px;
    padding-left: 25px;
    box-sizing: border-box;
    color: #a6a6a6;
    > dt {
      width: 130px;
      padding-right: 36px;
      font-size: 30px;
    }
    > dd {
      width: 557px;
      font-size: 28px;
      line-height: 60px;
      padding-right: 23px;
    }
  }
  padding-bottom: 100px;
}
.flagBtn {
  font-size: 20px;
}
// /deep/
// /deep/
// /deep/
// /deep/
.record {
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > dl {
    width: 710px;
    > dt {
      font-size: 27px;
      color: #a6a7a9;
      border-left: 8px solid #ea4e00;
      margin: 20px 0;
      padding-left: 10px;
    }
    > dd {
      width: 710px;
      height: 412px;
      background-color: #fff;
      display: flex;
      margin: 20px 0;
      justify-content: space-around;
      padding: 50px;
      box-sizing: border-box;
      flex-direction: column;
      > strong {
        font-size: 30px;
        color: #636363;
      }

      > p {
        color: #787878;
        font-size: 24px;
      }
      > .teacher {
        display: flex;
        align-items: center;
        color: #a7a7a7;
        font-size: 22px;
        > img {
          width: 55px;
          height: 55px;
          border-radius: 100%;
        }
      }

      > .num {
        display: flex;
        justify-content: space-between;
        > p:nth-child(1) {
          color: #c4c4c4;
          font-size: 25px;
        }
        > p:nth-child(2) {
          color: #51aa35;
          font-size: 33px;
        }
      }
    }
  }
}

//课程详情
.comment {
  background-color: #fff;
  width: 750px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    display: flex;
    > .active {
      overflow: unset;
      height: 100%;
    }
    > div {
      display: flex;
      flex-wrap: wrap;
      height: 70px;
      overflow: hidden;
      width: 700px;
      > div {
        width: 183px;
        height: 56px;
        border: 1px solid #ef9f68;
        border-radius: 10px;
        color: #ef9f68;
        text-align: center;
        line-height: 56px;
        margin: 10px;
        font-size: 24px;
      }
    }
  }
  > dl {
    display: flex;
    justify-content: center;
    padding-bottom: 60px;

    > dt {
      margin: 0 20px;
      > img {
        width: 54px;
        height: 54px;
        border-radius: 100%;
      }
    }
    > dd {
      > p {
        font-size: 29px;
        color: #c2c2c2;
        line-height: 76px;
      }
      > .list {
        display: flex;
        flex-wrap: wrap;
        > p {
          margin: 10px;
          width: 176px;
          height: 46px;
          background-color: #f5f5f5;
          color: #868686;
          font-size: 28px;
          text-align: center;
          line-height: 46px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
