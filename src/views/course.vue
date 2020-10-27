<template>
  <div>
    <van-nav-bar title="特色课">
      <template #right >
        <van-icon v-on:click="search" name="search" size="18" />
      </template>
    </van-nav-bar>

    <van-dropdown-menu>
      <van-dropdown-item title="分类" ref="item">
        <div class="cart">
          <p>年级</p>
          <ul>
            <li
              v-for="(item,index) in cart"
              :class="{active :active == item.id }"
              v-on:click="cartbtn(item.id)"
              :key="index"
            >{{ item.name}}</li>
          </ul>
        </div>
        <div class="cart">
          <p>学科</p>
          <ul>
            <li
              v-for="(item,index) in course"
              :class="{active :active == item.id }"
              v-on:click="cartbtn(item.id)"
              :key="index"
            >{{ item.name }}</li>
          </ul>
        </div>

        <div class="rlbtn">
          <van-button type="danger" block round>重置</van-button>
          <van-button type="danger" v-on:click="en" block round>确认</van-button>
        </div>
      </van-dropdown-item>

      <van-dropdown-item title="排序" ref="itemm">
        <ul>
          <li
            v-on:click="sorr(item.id)"
            class="sort"
            v-for="(item,index) in sort"
            :key="index"
          >{{ item.name }}</li>
        </ul>
      </van-dropdown-item>

      <van-dropdown-item title="筛选" ref="ite">
        <div class="cart">
          <ul>
            <li
              v-for="(item,index) in all"
              :class="{active :active == item.id }"
              :key="index"
               v-on:click="cartbtnn(item.id,item.type)"
            >{{ item.name }}</li>
          </ul>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <div class="record">
      <dl ref="scroll">
        <dt></dt>
        <dd  v-on:click="courseInfo(item.id)" v-for="(item,index) in list" :key="index">
          <strong>{{ item.title}}</strong>
          <p>
            <span>{{ item.start_play_date | dateTime }}</span> ~
            <span>{{ item.end_play_date | dateTime }}</span>
            {{ item.total_periods | time }}
          </p>
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
    
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from"./tabbar"
import { courseBasis, cart } from "../http/api";
export default {
  data() {
    return {
      cart: [
        {
          id: 1,
          name: "初一"
        },
        {
          id: 2,
          name: "初二"
        },
        {
          id: 3,
          name: "初三"
        },
        {
          id: 4,
          name: "高一"
        },
        {
          id: 5,
          name: "高二"
        }
      ],
      course: [
        {
          id: 6,
          name: "语文"
        },
        {
          id: 7,
          name: "数学"
        },
        {
          id: 8,
          name: "英语"
        },
        {
          id: 9,
          name: "物理"
        },
        {
          id: 10,
          name: "化学"
        }
      ],

      active: -1,

      // sort
      sort: [
        {
          id: 0,
          name: "综合排序"
        },
        {
          id: 1,
          name: "最新"
        },
        {
          id: 2,
          name: "最热"
        },
        {
          id: 3,
          name: "价格从低到高"
        },
        {
          id: 4,
          name: "价格从高到低"
        }
      ],
      all: [
        {
          id: 0,
          name: "全部",
          type:0
        },
        {
          id: 1,
          name: "大班课",
          type:2
        },
        {
          id: 2,
          name: "小班课",
          type:3
        },
        {
          id: 3,
          name: "公开课",
          type:4
        },
        {
          id: 4,
          name: "点播课",
          type:5
        },
        {
          id: 5,
          name: "面授课",
          type:7
        },
        {
          id: 6,
          name: "音频课",
          type:8
        },
        {
          id: 7,
          name: "系统课",
          type:9
        },
        {
          id: 8,
          name: "图文课",
          type:10
        },
        {
          id: 9,
          name: "会员课",
          type:0
        }
      ],
      isShow: "none",
      list: "",
      limit: 10,
      page: 1,
      attr_val_id: 0
    };
  },
  components: {
    tabbar
  },
  created() {
    courseBasis({
      limit: this.limit,
      page: this.page
    }).then(res => {
      console.log(res);
      this.list = res.data.data.list;
    });
  },
  filters: {
    dateTime(val) {
      let date = new Date(val * 1000);
      let y = date.getFullYear();
      let m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let min =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let result = "";
      result = `${m}月${d}日 ${h}:${min}:${s}`;

      return result;
    },

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
  mounted() {
    window.addEventListener("scroll", this.getbottom);
  },
  watch: {},
  computed: {},
  methods: {
    // 分类排序
    cartbtn(id) {
      this.attr_val_id = id;
      this.active = id;
    },
    en() {
      this.$refs.item.toggle();
      let params = {
        course_type: 0,
        classify_id: 0,
        order_by: 3,
        attr_val_id: this.attr_val_id,
        is_vip: 0
      };

      courseBasis(params).then(res => {
        this.list = res.data.data.list;
      });
    },
     courseInfo(id) {
      this.$router.push({
        path: `courseInfo/${id}`
      });
    },
    // 排序
    sorr(id) {
      this.$refs.itemm.toggle();
      let params = {
        course_type: 0,
        classify_id: "",
        order_by: id,
        attr_val_id: this.attr_val_id,
        is_vip: 0
      };

      courseBasis(params).then(res => {
        this.list = res.data.data.list;
      });
    },
    cartbtnn(id,type){
        this.$refs.ite.toggle();
      let params = {
        course_type: type,
        classify_id: '',
        order_by: '',
        attr_val_id: '',
        is_vip: 0
      };

      courseBasis(params).then(res => {
        this.list = res.data.data.list;
      });
},

    search(){

      this.$router.push({
        path:"/search"
      })


    },

    getbottom() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      let numHeight = scrollTop + clientHeight;
      if (scrollHeight > clientHeight && numHeight > scrollHeight - 1) {
        console.log(1);
        //加载更多操作
        this.page + 1;
        let params = {
          limit: this.limit,
          page: this.page
        };

        courseBasis(params).then(res => {
          res.data.data.list.map(item => {
            this.list.push(item);
          });
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
/deep/.van-nav-bar {
  height: 80px;
}
/deep/.van-nav-bar__title {
  font-size: 38px;
}
/deep/.van-nav-bar .van-icon {
  color: #aaa;
  font-size: 50px;
}
/deep/.van-icon-search::before {
  font-size: 50px;
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
/deep/.van-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}
/deep/.van-button--block {
  width: 50%;
  height: 88px;
  border-radius: 0;
}

.cart {
  padding: 20px;

  box-sizing: border-box;
  > p {
    color: #999999;
    font-size: 23px;
  }
  > ul {
    display: flex;
    flex-wrap: wrap;
    .active {
      color: #eb6609;
    }
    > li {
      font-size: 23px;
      color: #999999;
      width: 140px;
      height: 67px;
      background-color: #f5f5f5;
      border-radius: 20px;
      text-align: center;
      line-height: 67px;
      margin: 10px;
    }
  }
}

.sort {
  text-align: center;
  border-bottom: 1px solid #f2f2f2;
  height: 100px;
  line-height: 100px;
  font-size: 32px;
}

.rlbtn {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  > button:nth-child(1) {
    width: 40%;
    border-radius: 20px;
    border: 1px solid #aaa;
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
    width: 40%;
    border-radius: 20px;
  }
}

// 列表区域
.record {
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ccc;
  > dl {
    width: 710px;

    > dd {
      border-radius: 20px;
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
</style>
