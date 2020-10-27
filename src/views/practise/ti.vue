<template>
  <div>
    <van-nav-bar left-arrow v-on:click-left="onClickLeft" title="题库练习"></van-nav-bar>
    <dl class="list">
      <dt>
        <p>题库练习</p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shezhiziduan" />
        </svg>
      </dt>
      <dd v-on:click="ques(item)" v-for="(item,index) in list" :key="index">
        <div>
          <div>
            <span>{{ item.name }}</span>

            <p>
              <span>{{ item.finished_amount }}</span>/
              <span>{{ item.question_amount }}</span>
            </p>
          </div>
          <van-progress :show-pivot="false" inactive :percentage="item.correct_rate" />
        </div>>
      </dd>
    </dl>
  </div>
</template>

<script>
import { examPoint } from "../../http/api";
export default {
  data() {
    return {
      list: ""
    };
  },
  created() {
    examPoint(this.$route.query).then(res => {
      console.log(res);
      this.list = res.data.data;
    });
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    ques(item){
        this.$router.push({
            path:`/ques/${item.id}`
        })
    }
  }
};
</script>

<style lang="scss" scoped>
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

.list {
  width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > dt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 698px;
    height: 125px;
    font-size: 35px;
    color: #4e2930;
  }

  > dd {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 698px;
    height: 125px;
    border: 1px solid #ccc;
    border-radius: 10px;
    > div {
      width: 500px;
      height: 125px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > div {
        display: flex;
        > span {
          font-size: 33px;
          color: #676c71;
        }
        > p {
          padding-left: 274px;
          font-size: 33px;
          color: #ccc;
        }
      }
    }
  }
}
</style>
