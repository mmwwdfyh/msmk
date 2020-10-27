<template>
  <div id="box">
    <!-- 头部 -->
    <h3>练习</h3>
    <!-- 五宫格 -->

    <ul>
      <li v-on:click="point">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lianxi" />
          </svg>
        </div>

        <p>考点专练</p>
      </li>

      <li  v-on:click="paper_package">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-books" />
          </svg>
        </div>

        <p>套卷联系</p>
      </li>

      <li v-on:click="exam">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-lianxi" />
          </svg>
        </div>

        <p>仿真模考</p>
      </li>

      <li v-on:click="error_ques">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bi1" />
          </svg>
        </div>

        <p>错题练习</p>
      </li>

      <li  v-on:click="assess">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-" />
          </svg>
        </div>

        <p>测评记录</p>
      </li>

      <li  v-on:click="ques_collect">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xin" />
          </svg>
        </div>

        <p>习题收藏</p>
      </li>
    </ul>
    <!-- //近期模考 -->
    <div class="practise">
      <h4>近期模考</h4>
      <p>
        默认排序
        <span>时间</span>
      </p>

      <van-empty description="暂无模考，敬请期待" />
    </div>

    <tabbar />
  </div>
</template>

<script>
import tabbar from "./tabbar";
export default {
  data() {
    return {};
  },
  created() {},
  components: {
    tabbar
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
      //考点练习
      point(){
          this.$router.push({
              path:"/point"
          })
      },
      //套卷练习
      paper_package(){
          this.$router.push({
              path:"/paper_package"
          })

      },
      // 仿真模考
       exam(){
          this.$router.push({
              path:"/exam"
          })

      },
      //错题练习
       error_ques(){
          this.$router.push({
              path:"/error_ques"
          })

      },
      //测评记录
       assess(){
          this.$router.push({
              path:"/assess"
          })

      },
      //习题收藏
       ques_collect(){
          this.$router.push({
              path:"/ques_collect"
          })

      }



  }
};
</script>

<style lang="scss"  scoped>
//头部
h3 {
  width: 750px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  background-color: #fff;
  font-size: 40px;
  font-weight: bold;
}

#box {
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  //   九宫格
  > ul {
    width: 715px;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    > li {
      width: 175px;
      height: 190px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      > div {
        width: 85px;
        height: 85px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        box-shadow: 0px 0px 30px #f8f8f9;
        border-radius: 100%;
      }
      > p {
        color: #666666;
        font-size: 25px;
      }
    }
  }
  //近期模考
  > .practise {
    width: 750px;
    background-color: #fff;
    margin-top: 20px;
    padding: 15px;
    box-sizing: border-box;

    > h4 {
      height: 84px;
      color: #979797;
      line-height: 84px;
    }
    > p {
      display: flex;
      justify-content: space-between;
      color: #ea5400;
      font-size: 29px;
      > span {
        color: #acacac;
        font-size: 29px;
      }
    }
  }
}
// 空状态

/deep/.van-empty {
  width: 715px;
  height: 357px;
}
/deep/.van-empty__image {
  width: 330px;
  height: 273px;
}

.icon {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  box-shadow: 0, 0, 0, 0;
}
</style>
