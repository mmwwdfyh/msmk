<template>
  <div>
    <van-nav-bar left-arrow v-on:click-left="onClickLeft" title="题库练习">
      <template #right>
        <svg class="icon" v-on:click="collect" aria-hidden="true">
          <use xlink:href="#icon-tubiaozhizuomoban" />
        </svg>
      </template>
    </van-nav-bar>

    <dl class="list">
      <dt>
        <p v-for="(item,index) in title" :key="index">{{ item }}</p>
        <p>
          <span>{{ this.index +1 }}</span>/
          <span>{{this.all.length}}</span>
        </p>
      </dt>
      <dd>
        <h4>
          {{ this.index +1 }}.
          <span v-html="ques.ques_stem"></span>
        </h4>
        <div>
          <div v-for="(item,index) in ques.ques_option " :key="index">
            <span>{{ item.id | a }}</span>
            <p v-html="item.content"></p>
          </div>
        </div>

        <div class="btn">
          <button v-on:click="shang" :class="{ disable:index-1<0 }">上一题</button>
          <button v-on:click="xia">{{ butt }}</button>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import { ques, point ,collec } from "../../http/api";
export default {
  data() {
    return {
      title: "",
      ques: "",
      index: 0,
      disable: false,
      butt: "下一题",
      all: ""
    };
  },
  created() {
    ques(this.$route.params.id).then(res => {
      console.log(res);
      this.all = res.data.data;
      this.ques = this.all[this.index];
    });
    point(this.$route.params.id).then(res => {
      this.title = res.data.data;
    });
  },
  filters: {
    a(val) {
      if (val == 1) {
        return "A、";
      } else if (val == 2) {
        return "B、";
      } else if (val == 3) {
        return "C、";
      } else if (val == 4) {
        return "D、";
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
    // 点击下一题
    xia() {
      if (this.butt == "答题卡") {
        return false;
      }

      if (this.index < this.all.length) {
        console.log(this.all.length);
        this.index++;
        this.ques = this.all[this.index];
      } else {
        alert(1);
      }
    },
    //点击上一题
    shang() {
      if (this.index - 1 < 0) {
        this.$toast("已经是第一题了");
      } else {
        this.index--;
        this.ques = this.all[this.index];
      }
    },
    collect() {
      let data = {
        ques_id: this.all[this.index].id,
        type: 3
      };
      collec(data).then(res=>{

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
    width: 690px;
    height: 90px;
    font-size: 35px;
    color: #4e2930;
  }

  > dd {
    width: 700px;
    > h4 {
      display: flex;
      padding: 40px 0;
    }
    > div {
      > div {
        display: flex;
        margin-left: 70px;
        padding: 20px 0;
      }
    }
  }
}

.btn {
  width: 700px;
  display: flex;
  justify-content: space-between;
  > button {
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 10px;
    width: 182px;
    height: 61px;
    font-size: 30px;
  }
  .disable {
    background-color: #f5f5f5;
    color: #c0c8d3;
  }
}

/deep/.icon {
  width: 100px;
  height: 34px;
}
</style>
