<template>

  <div class="set_message">
    <van-nav-bar v-on:click-left="onClickLeft" title="我的关注" left-arrow>
     
    </van-nav-bar>

    <!-- //列表 -->
    <div class="oto">
      <ul>
        <li v-for="(item,index) in collectlist" :key="index">
          <div>
            <img :src="item.avatar" alt />
            <div>
              <p>
                {{ item.teacher_name }}
                <span>{{ item.level_name }}</span>
              </p>
              <p>{{ item.introduction }}</p>
            </div>

            <button v-on:click="falg(item.collect_id)">取消关注</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { collect, cancel } from "../../http/api";
export default {
  data() {
    return {
      show: false,
      collectlist: ""
    };
  },
  created() {
    let data = {
      page: 1,
      limit: 10,
      type: 2
    };
    collect(data).then(res => {
      console.log(res);
      this.collectlist = res.data.data.list;
    });
  },

  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    // 取消关注
    falg(id) {

      cancel(id).then(res => {
        this.collectlist = res.data.data.list;
              location.reload();

      });
      
    //   location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
html,body{

  height: 100%;
}
.box{
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
  height: 300%;
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
        }
        > button {
          width: 141px;
          height: 63px;
          background-color: #ebeefe;
          color: #eb6609;
          border: 0;
          font-size: 20px;
          border-radius: 40px;
        }
        > div {
          width: 400px;
          line-height: 50px;
          > p:nth-child(1) {
            font-size: 30px;
            color: #000;
            > span {
              font-size: 20px;
              color: #eb6609;
            }
          }
          > p:nth-child(2) {
            font-size: 23px;
            color: #b1b1b1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
