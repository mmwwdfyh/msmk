<template>
  <div>
    <van-nav-bar title="题库选择" left-arrow @click-left="onClickLeft" />
    <van-search v-model="value" shape="round" background="#fff" placeholder="请输入搜索关键词" />

    <div id="box">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-on:click="classify(item.id)"
          v-for="(item,index) in list"
          :key="index"
          :title="item.name"
        />
      </van-sidebar>

      <!-- 右边 -->
      <div class="right">
        <ul>
          <li v-for="(item,index) in text" :key="index">
            <p>{{ item.name }}</p>
            <span class="spp" v-on:click="ti(item)" v-for="(item,index) in item.bank" :key="index">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { classify, quesBank } from "../../http/api";
export default {
  data() {
    return {
      value: "",
      activeKey: 0,

      list: "",

      text: ""
    };
  },
  created() {
    //获取左边列表
    classify().then(res => {
      console.log(res);
      this.list = res.data.data;
      console.log(this.list);

      let id = this.list[0].id;
      console.log(id);
      quesBank(id).then(res => {
        console.log(res);
        this.text = res.data.data;
      });
    });
    // 题库
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击匹配右边
    classify(id) {
      quesBank(id).then(res => {
        console.log(res);
        this.text = res.data.data;
      });
    },
    ti(item){
      console.log(item)
      this.$router.push({
        path:'/ti',
        query:item
      })
    }

  }
};
</script>

<style lang="scss" scoped>
#box {
  display: flex;

  > .right {
    > ul {
      > li {
        padding-top: 50px;
        padding-left: 37px;
        > p {
          font-size: 25px;
          padding-bottom: 30px;
        }
        > span.spp {
          display: inline-block;
          width: 232px;
          padding: 16px 10px;
          text-align: center;

          background-color: #f5f5f5;
          font-size: 28px;
        }
      }
    }
  }
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
/deep/.van-search {
  width: 750px;
  height: 154px;
}
/deep/.van-search__content--round {
  width: 694px;
  height: 101px;
}
/deep/.van-field__control {
  width: 694px;
  height: 101px;
}
/deep/[data-v-38d5b046] .van-icon-search::before {
  font-size: 24px;
}
/deep/.van-field__left-icon .van-icon {
  right: -623px;
  top: 35px;
}

// 左边
/deep/.van-sidebar {
  width: 196px;
}
/deep/.van-sidebar-item__text {
  font-size: 34px;
}

/deep/.van-sidebar-item {
  line-height: initial;
}
/deep/.van-sidebar-item--select::before {
  opacity: 0;
}
/deep/ .van-sidebar-item {
  padding-left: 44px;
  // box-sizing: content-box;
  width: 180px;
}
// /deep/
// /deep/
// /deep/
</style>
