<template>
  <div class="set_message">
    <van-nav-bar v-on:click-left="onClickLeft" title="一对一辅导" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 上方选项卡 -->
    <van-dropdown-menu>
      <!-- <van-dropdown-item v-model="value" :options="option" /> -->

      <van-dropdown-item overlay="false" title="选择上课时间" ref="item">
        <div class="ttime">
          <div class="timer">
            <h6>时段</h6>
            <div>
              <p>
                <input type="text" class="aaa" value="开始时间" />
              </p>
              <p>
                <input type="text" value="结束时间" />
              </p>
            </div>
          </div>

          <van-datetime-picker
            v-model="currentTime"
            type="time"
            title="选择时间"
            :min-hour="0"
            :max-hour="24"
          />
        </div>

        <div class="rlbtn">
          <van-button type="danger" block round>重置</van-button>
          <van-button type="danger" block round>确认</van-button>
        </div>
      </van-dropdown-item>

      <van-dropdown-item title="按老师条件查找" ref="item">
        <div class="rlbtn">
          <van-button type="danger" block round>重置</van-button>
          <van-button type="danger" block round>确认</van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <!-- //列表 -->
    <div class="oto">
      <ul>
        <li v-for="(item,index) in otolist" :key="index">
          <div>
            <img :src="item.avatar" alt />
            <div>
              <p>{{ item.real_name }}</p>
              <p>
                <span>{{ item.sex | sex }}</span>
                {{ item.teach_age | age }}
              </p>
            </div>

            <button>预约</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { oto, info } from "../../http/api";
export default {
  data() {
    return {
      show: false,
      otolist: "",
      //vant组件
      value: 0,
      switch1: false,
      switch2: false,
       currentTime: '24:00',

    };
  },
  created() {
    let token = localStorage.getItem("token");
    console.log(token);
    let data = {
      page: 1,
      limit: 10
    };
    oto(token, data).then(res => {
      this.otolist = res.data.data;
    
    });
  },
  //过滤
  filters: {
    sex(val) {
      if (val == 0) {
        return "男";
      } else {
        return "女";
      }
    },
    age(val) {
      return `${val}年教龄`;
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // tan() {
    //   this.show = true;
    // },
    onClickLeft() {
      this.$router.go(-1);
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
  position: relative;
  left: 0;
  top: 0;
  background-color: #f0f2f5;
  z-index: 1111;
}
.van-nav-bar {
  height: 100px;
}
/deep/.van-nav-bar__title {
  font-size: 40px;
}
/deep/.van-icon-arrow-left::before {
  font-size: 40px;
}
/deep/.van-icon-search::before {
  font-size: 52px;
  color: #646464;
}

.oto {
  width: 750px;
  display: flex;
  justify-content: center;
  > ul {
    width: 711px;

    > li {
      width: 711px;
      height: 163px;
      background-color: #fff;
      margin: 10px 0;
      > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        > img {
          width: 85px;
          height: 85px;
          border-radius: 100%;
        }
        > button {
          width: 141px;
          height: 63px;
          background-color: #ebeefe;
          color: #eb6609;
          border: 0;
          font-size: 30px;
          border-radius: 40px;
        }
        > div {
          width: 400px;
          line-height: 40px;
          > p:nth-child(1) {
            font-size: 30px;
            color: #a7a7a7;
          }
          > p:nth-child(2) {
            font-size: 23px;
            color: #b1b1b1;
          }
        }
      }
    }
  }
}

// 组件样式

/deep/.van-dropdown-menu__bar {
  height: 100px;
}
/deep/.van-dropdown-menu__item .van-ellipsis {
  height: 100px;
  font-size: 30px;
  line-height: 100px;
}
/deep/.van-popup--top {
  min-height: 100%;
  background-color: #f0f2f5;
}
/deep/.van-button--block {
  width: 50%;
  height: 88px;
  border-radius: 0;
}

// 讲师信息
.rlbtn {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;

  > button:nth-child(1) {
    border: 0;
    background-color: #fff;
    color: #eb6609;
    font-size: 37px;
    outline: none;
  }
  > button:nth-child(2) {
    font-size: 37px;
    border: 0;
    background-color: #eb6609;
    color: #ffffff;
    outline: none;
  }
}

.ttime {
  width: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
// 时段
.timer {
  width: 710px;
  height: 189px;
  background-color: #fff;
  padding: 25px;
  box-sizing: border-box;
  > h3 {
    font-size: 22px;
  }

  // 时段
  > div {
    width: 660px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > p {
      width: 296px;
      height: 70px;
      border: 1px solid #ebebe4;
      box-sizing: border-box;
      line-height: 55px;
      > input {
        width: 280px;
        height: 50px;
        background-color: #ebebe4;
        border: 4px solid #fff;
        font-size: 26px;
        ::placeholder {
          color: red;
        }
      }
    }
  }
}
</style>
