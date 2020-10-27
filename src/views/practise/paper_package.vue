<template>
  <div>
    <van-nav-bar left-arrow v-on:click-left="onClickLeft" title="套卷练习">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 下拉菜单 -->
    <van-dropdown-menu>
      <van-dropdown-item title="套卷分类" ref="item">
        <van-sidebar v-model="activeKey" >
          <van-sidebar-item title="全部" />
          <van-sidebar-item v-for="(item,index) in list" :key="index" :title="item.name" />
        </van-sidebar>
      <div>

      </div>

      </van-dropdown-item>





      <van-dropdown-item title="套卷状态" ref="item">


           <ul class="all">
             <li v-on:click="all(index)" :class="{ active : active == index}" v-for="(item,index) in arr" :key="index" >{{ item }}</li>
         
           </ul>
      </van-dropdown-item>
     




    </van-dropdown-menu>
  </div>
</template>

<script>
import { paper_package } from "../../http/api";
export default {
  data() {
    return {
      activeKey: 0,
      arr:["全部","已做","未做"],
      list: "",
      active:0
    };
  },
  created() {
    // 获取分类数据
    paper_package().then(res => {
      console.log(res);
      this.list = res.data.rows;
    });
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onConfirm() {
      this.$refs.item.toggle();
    },


    all(index){

      
      this.active = index
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
/deep/.van-dropdown-menu__bar {
  height: 84px;
}
/deep/.van-dropdown-menu__title {
  height: 84px;
  line-height: 84px;
  font-size: 30px;
}
/deep/.van-dropdown-menu__title::after {
  font-size: 30px;
  border-color: transparent transparent #000 #000;
}

/deep/.van-dropdown-menu__title--active::after {
  border-color: transparent transparent currentColor currentColor;
}

/deep/.van-sidebar {
  width: 330px;
}
/deep/.van-sidebar-item {
  width: 300px;
  height: 100px;
  line-height: 100px;
  box-sizing: content-box;
}
/deep/.van-sidebar-item__text {
  position: relative;
  width: 300px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
/deep/.van-sidebar-item--select::before {
  height: 40px;
  background-color: #eb6201;
}
.van-sidebar-item--select {
  color: #eb6201;
}


.all{
  >li{
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 30px;
  }
}

.active{
    color: #eb6201;
}
</style>
