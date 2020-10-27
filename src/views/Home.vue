<template>
  <div id="home_box">
    <van-swipe :show-indicators="false" class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(item,index) in banner " :key="index">
        <img :src="item.banner_img" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- 特色课 -->
    <div class="good">
      <ul>
        <li v-on:click="goods(index)" v-for="(item,index) in goos" :key="index">
          <svg class="icon iconn" aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>

    <!-- 名师阵容 -->
    <div class="teach">
      <dl v-for="(item,index) in tearchList" :key="index">
        <dt>{{ item.channel_info.name }}</dt>
        <dd v-for="(item,index) in item.list" :key="index" v-on:click="teacher(item,index)">
          <img :src="item.teacher_avatar" alt />
          <div>
            <strong>{{ item.teacher_name}}</strong>
            <p>{{ item.introduction }}</p>
          </div>
        </dd>
      </dl>
    </div>

    <!-- 精品课程和推荐课程 -->
    <div class="record">
      <dl v-for="(item,index) in record" :key="index">
        <dt>{{ item.channel_info.name }}</dt>

        <dd v-for="(item,index) in item.list" v-on:click="courseInfo(item.id)" :key="index">
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

    <!-- 明星讲师 -->
    <div class="teach">
      <dl v-for="(item,index) in supteach" :key="index">
        <dt>{{ item.channel_info.name }}</dt>
        <dd v-for="(item,index) in item.list" v-on:click="teacher(item,index)" :key="index">
          <img :src="item.teacher_avatar" alt />
          <div>
            <strong>
              {{ item.teacher_name}}
              <span>{{ item.level_name }}</span>
            </strong>
            <p>{{ item.introduction }}</p>
          </div>
         
        </dd>
      </dl>
    </div>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "./tabbar";
import { banner, tearchList } from "../http/api";
export default {
  data() {
    return {
      banner: "",
      tearchList: "",
      record: "",
      supteach: "",

      // 特色课区域
      goos: [
        {
          name: "特色课",
          path: "/course",
          icon: "#icon-book"
        },
        {
          name: "一对一辅导",
          path: "/oto",
          icon: "#icon-icon-test"
        },
        {
          name: "学习日历",
          path: "/study-calendar",
          icon: "#icon-shu"
        }
      ]
    };
  },
  components: {
    tabbar
  },
  created() {
    //轮播图接口请求
    banner().then(res => {
      // console.log(res);
      this.banner = res.data.data;
    });
    tearchList().then(res => {
      //名师阵容
      this.tearchList = res.data.data.filter(item => {
        return item.channel_info.type == 3;
      });
      //精品课程和推荐课程
      this.record = res.data.data.filter(item => {
        return item.channel_info.type == 1;
      });
      // 明星讲师
      this.supteach = res.data.data.filter(item => {
        return item.channel_info.type == 4;
      });
    });
  },
  filters: {
    //局部过滤器
    time(val) {
      return ` 共${val}课时 `;
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

  computed: {},
  mounted() {},
  watch: {},

  methods: {
    // 切换老师详情

    teacher(item) {
      console.log(item);
      this.$router.push({
        path: `teacher/${item.teacher_id}`
      });
    },
    goods(index) {
      this.$router.push({
        path: this.goos[index].path
      });
      this.$store.state.active = 1;
    },
    // 课程详情

    courseInfo(id) {
      this.$router.push({
        path: `courseInfo/${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#home_box {
  background-color: #f0f2f5;
}

.van-swipe-item {
  width: 750px;
  height: 400px;
  > img {
    width: 750px;
    height: 400px;
  }
}

//   特色课区域
.good {
  width: 750px;
  height: 150px;

  padding-bottom: 40px;
  position: relative;
  left: 0;
  top: -25px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;

  > ul {
    width: 100%;

    display: flex;
    justify-content: space-around;
    align-items: center;
    > li {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #aaa;
    }
  }
}
.iconn {
  width: 53px;
  height: 53px;
}
li:nth-child(1) {
  > .iconn {
    color: blue;
  }
}
li:nth-child(2) {
  > .iconn {
    color: #73b3a5;
  }
}
li:nth-child(3) {
  > .iconn {
    color: #d78d6f;
  }
}

// 名师列表区域

.teach {
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding-bottom: 100px;
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
      height: 160px;
      background-color: #fff;
      display: flex;
      margin: 20px 0;
      align-items: center;
      justify-content: space-around;
      > img {
        width: 80px;
        height: 80px;
        border-radius: 100%;
      }
      > div {
        width: 543px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        > strong {
          font-size: 34px;
          color: #8e8e8e;
          > span {
            color: red;
          }
        }
        > p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          font-size: 24px;
          color: #adadad;
        }
      }
    }
  }
}
.teach:last-child {
  padding-bottom: 100px;
}
// 精品课程和推荐课程

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
        justify-content:space-between;
        align-items: center;
        flex-direction:column-reverse;

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
</style>
