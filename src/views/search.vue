<template>
  <div>
    <van-search
      v-model="value"
      left-arrow
      v-on:input="input"
      left-icon
      show-action
      placeholder="请输入搜索关键词"
    >
      <template #action>
        <div @click="onSearch">{{out}}</div>
      </template>
    </van-search>

    <div class="box">
      <div class="search" v-show="!show">
        <h3>历史搜索    <span></span></h3> 
        <ul>
          <li  v-on:click="tui(item)" v-for="(item,index) in hist" :key="index"> {{ item }} </li>
        </ul>
      </div>

         <!-- 精品课程和推荐课程 -->
    <div class="record" v-show="show">
      <dl >
      

        <dd v-for="(item,index) in list" v-on:click="courseInfo(item.id)" :key="index">
          <strong>{{ item.title}}</strong>
          <p>{{ item.total_periods | time }}</p>
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

    </div>
  </div>
</template>

<script>
import { search } from "../http/api";
export default {
  data() {
    return {
      value: "",
      out: "取消",
      list:'',
      show:false,
      hist:[ ]
    };
  },
  created() {
    let hist = JSON.parse(localStorage.getItem('hist')) 
    if(hist){
        this.hist =JSON.parse(localStorage.getItem('hist'))
    }else{
        this.hist =[]
    }
  },
  mounted() {},
  watch: {},
  computed: {},
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
  methods: {

    //   历史记录点击
    tui(item){
        this.value = item
    },


    onSearch() {
      if (this.out == "搜索") {
    
  
        let index =   this.hist.findIndex(item=>{
              return item == this.value
          })
      
          if(index==-1){
 this.hist.push(this.value)
          }
     
          localStorage.setItem("hist",JSON.stringify(this.hist))
        let params = {
          limit: 10,
          page: 1,
          course_type: 0,
          keywords: this.value
        };
        search(params).then(res => {
          console.log(res);
          this.list = res.data.data.list

          if(this.list  != ""){
              this.show = !this.show 
          }
        });
      } else {
        this.$router.go(-1);
      }
    },
    input() {
      this.out = "搜索";
        this.show = true
      if (this.value == "") {
        this.out = "取消";
        this.list = ''
        this.show = false
      } else {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.van-search--show-action {
  width: 750px;
  height: 95px;
}
.box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.search{
    width: 682px;
    padding-top: 52px;
    >ul{
        display: flex;
        flex-wrap: wrap;
        

        >li{
            background-color: #e4e7ed;
            padding: 25px;
            border-radius: 20px;
            margin: 10px;
        }
    }
}



.record {
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
    background-color: #ccc;
  > dl {
    width: 710px;
    > dt {
      font-size: 27px;
      color: #a6a7a9;
      border-left: 8px solid #ea4e00;
      margin: 20px 0;
      padding-left: 10px;
    }
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
