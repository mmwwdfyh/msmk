<template>
  


  <div class="box">
    <!-- 头部 -->
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
        <button v-on:click="flagBtn" class="flagBtn">查看详情</button>
      </div>                          
    </div>                                 
    <!-- 日期 -->
    <div class="data">
      <h3>

        <span>选择时间</span>
      </h3>
      <van-tabs v-model="active">
        <van-tab v-for="(item,index) in data" :key="index">
          <template #title>
            <ul>
              <li>
                <p>周一</p>
                <p>{{ item }}</p>
              </li>
            </ul>
          </template>
          内容 {{ index }}
        </van-tab>
      </van-tabs>
    </div>
    



  </div>


</template>
  
<script>
import { teacher, invite } from "../../../http/api";
export default {
  data() {
    return {
      list: "",
      active: "",
      data: ""
    };
  },
  created() {
    console.log(this.$route.params.id);
    teacher(this.$route.params.id).then(res => {
      this.list = res.data.data.teacher;
      console.log(this.list);
    });

    // 选择时间
    let data = {
      teacher_id: this.$route.params.id,
      week_day: 1,
      is_next: 0
    };
    invite(data).then(res => {
      console.log(res);
      this.data = res.data.data.weekDateList;
    });
  },
  mounted() {},
  filters: {
    time(val) {
      return ` 共${val}课时 `;
    },

    sex(val) {
      if (val == 0) {
        return "男";
      } else {
        return "女";
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    flagBtn() {
      let id = this.list.id;
      this.$router.push({
        path: `/teacher/${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
/deep/.van-tabs--line .van-tabs__wrap {
  height: 149px;
}
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
      font-size: 20px;
    }
  }
}
html,
body {
  height: 100%;
}
.box {
  background-color: #ccc;
  height: 100%;
  padding-bottom: 1000px;
}

//日期
.data {

  width: 750px;
  padding-top: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
h3 {
  width: 713px;
  height: 99px;
  line-height: 99px;
  color: #818182;
  font-size: 32px;

  >span{
    padding-left: 30px;
    border-left: 8px solid #eb5a00;
  }
}
/deep/.van-tab__text {
  height: 149px;
  > ul {
    height: 149px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    > li {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
  }
}
/deep/.van-tabs--line .van-tabs__wrap {
  width: 713px;
  border-radius: 20px;
  overflow: hidden;
}


</style>
