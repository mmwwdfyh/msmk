<template>
  <div class="set_message">
    <van-nav-bar v-on:click-left="onClickLeft" title="我的收藏" left-arrow></van-nav-bar>

    <!-- //列表 -->
    <div class="record">
      <dl>
        <dd v-for="(item,index) in collectlist" :key="index">
          <strong>{{ item.title}}</strong>
          <p>{{ item.section_num | time }}</p>
          <div class="teacher">
            <img :src="item.teachersAvatar" alt />
            <span>{{ item.teachers }}</span>
          </div>
          <div class="num">
            <p>{{ item.sales_num | num }}</p>
            <p>{{ item.price }}</p>
          </div>
          <span>
            <svg class="icon" v-on:click="outcollect(item.collect_id)" aria-hidden="true">
              <use xlink:href="#icon-star" />
            </svg>
          </span>
          <i></i>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { collect, cancelme } from "../../http/api";
export default {
  data() {
    return {
      show: false,
      collectlist: ""
    };
  },
  created() {
    let da = {
      page: 1,
      limit: 10,
      type: 1
    };
    collect(da).then(res => {
      this.collectlist = res.data.data.list;
      console.log(this.collectlist);
    });
  },

  mounted() {},
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
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    outcollect(id){

        cancelme(id).then(res=>{
                  // location.reload();
        })
    }
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}
.box {
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

.record {
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > dl {
    width: 710px;

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
      position: relative;
      > strong {
        font-size: 30px;
        color: #636363;
        padding-right: 50px;
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
        > span {
          margin-left: 30px;
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
.icon {
  position: absolute;
  right: 50px;
  top: 58px;
}
</style>
