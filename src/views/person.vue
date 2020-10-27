<template>
<div>
 <div class="my_box">
    <div class="mybg"></div>
    <div class="my_content">
      <!-- 个人信息头像 -->
      <div class="my_header">
        <div v-on:click="inf">
          <img :src="info.avatar" alt  v-on:click="inf" />

          <p  v-on:click="inf">{{ info.nickname }}</p>
          <svg  v-on:click="inf" class="icon" aria-hidden="true">
            <use xlink:href="#icon-bi2" />
          </svg>
          <span class="go_course" v-on:click.stop="go_course">去约课</span>
        </div>

        <!-- 个人中心下面 -->
        <ul>
          <li>
            <p>0</p>
            <p>我的特色课</p>
            <p>已购特色课程的学习</p>
          </li>
          <li>
            <p>0</p>
            <p>一对一辅导</p>
            <p>我的一对一老师辅导</p>
          </li>
          <li>
            <p>0.00</p>
            <p>剩余学习币</p>
            <p>查看剩余学习币</p>
          </li>
        </ul>
      </div>
      <!-- 头部下面 -->
      <img src="../assets/miao.gif" alt />

      <!-- 课程相关 -->
      <div class="all">
        <h3>课程相关</h3>
        <ul>
          <li v-on:click="concern">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-A" />
            </svg>
            <p>关注的老师</p>
          </li>
          <li v-on:click="collect">
            <svg class="icon"  aria-hidden="true">
              <use xlink:href="#icon-shoucang" />
            </svg>
            <p>我的收藏</p>
          </li>
        </ul>
      </div>

      <!-- 订单相关 -->
      <div class="all">
        <h3>订单相关</h3>
        <ul>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-ziyuan1" />
            </svg>
            <p>课程订单</p>
          </li>
        <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-ziyuan1" />
            </svg>
            <p>会员订单</p>
          </li>
           <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-ziyuan1" />
            </svg>
            <p>约课订单</p>
          </li>
        </ul>
      </div>

      <!-- 我的账户 -->
     <div class="all">
        <h3>我的账户</h3>
        <ul>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youhuijuan" />
            </svg>
            <p>优惠卷</p>
          </li>
        <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qia" />
            </svg>
            <p>会员卡</p>
          </li>
           <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xin" />
            </svg>
            <p>会员</p>
          </li>
        </ul>
      </div>
      <!-- 自助服务 -->

     <div class="all">
        <h3>自助服务</h3>
        <ul>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-lingdang" />
            </svg>
            <p>我的消息</p>
          </li>
        <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-ziyuan" />
            </svg>
            <p>意见反馈</p>
          </li>
           <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zaixiankefu-yimidida-" />
            </svg>
            <p>在线客服</p>
          </li>
           <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shezhiziduan" />
            </svg>
            <p>设置</p>
          </li>
        </ul>
      </div>


    </div>
  </div>
  
    <tabbar></tabbar>
</div>
 
</template>

<script>
import tabbar from "./tabbar"

import { info} from "../http/api";
export default {
  data() {
    return { 
      info: "",

    };
  },
  created() {
    let token = localStorage.getItem("token");

    info(token).then(res => {
      console.log(res);
      this.info = res.data.data;
      console.log(this.info)
    });
  },
  mounted() {},

  components: {
    tabbar
  },
  computed: {},
  methods: {
    // 去约课

    go_course(){
      this.$router.push({
         path: 'oto', 
      })
    },
    //关注的老师
    concern(){
         this.$router.push({
         path: 'concern', 
      })
    },
    //收藏
    collect(){
         this.$router.push({
         path: 'collect', 
      })
    },
    //个人信息

    inf(){
          this.$router.push({
         path: 'info', 
      })
    }


  }
};
</script>

<style lang='scss' scoped>
html,
body {
  height: 100%;
}
.mybg {
  background-color: #fc5500;
  width: 850px;
  height: 430px;
  border-radius: 50%;
  position: relative;
  left: -50px;
  top: -140px;
}
.my_box {
  background-color: #fdfdfd;
  overflow: hidden;
  width: 750px;
  height: 100%;

}
.go_course{
  width: 114px;
  height: 50px;
  background-color: #eb6100;
  color: #fff;
  border-radius: 10px 0 0 10px;
  font-size: 25px;
  text-align: center;
  line-height: 50px;


}
.my_content {
  width: 695px;
  background-color: #fff;
  position: absolute;
  top: 91px;
  left: 30px;
    padding-bottom: 100px;
       border-radius: 20px;
  // 头像

  > .my_header {
    width: 695px;
    height: 346px;
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
    background-color: #fff;
    // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    > div {
      width: 695px;
      height: 187px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 30px;
      box-sizing: border-box;

      > img {
        width: 120px;
        height: 120px;
        border-radius: 100%;
      }
      >.icon{
        color: #eb6100;
      }
    }

    // 头像下面

    > ul {
      width: 695px;
      height: 159px;
      display: flex;
      justify-content: space-between;
      > li {
  
        height: 150px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        > p:nth-child(3) {
          font-size: 13px;
          color: #c2c2c2;

        }
        > p:nth-child(2) {
          font-size: 20px;
          color: #7f7f7f;
        }
        > p:nth-child(1) {
          font-size: 38px;
          color: #f18941;
                    font-weight: bold;
        }
      }
    }
  }
  > img {
    width: 695px;
    height: 147px;
    margin-top: 15px;
  }
}
/deep/.icon {
  color: #fb5500;
}

// 课程相关下面总体布局

.all {
  width: 695px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
       margin-bottom: 30px;
  > h3 {
    font-size: 34px;
    color: #4c4c4c;
  }
  > ul {
    display: flex;

    > li {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      width: 174px;
      height: 163px;
 
      color: #707070;
      >.icon{
        font-size: 44px;
      }
      >p{
 font-size: 25px;
      }
    }
  }
}
</style>
