<template>
    <div>
   <van-nav-bar left-arrow  v-on:click-left="onClickLeft" title="习题收藏">
      <template #right >
        <van-icon  name="search" size="18" />
      </template>
    </van-nav-bar>

  <!-- 下拉菜单 -->
<van-dropdown-menu>
 
  <van-dropdown-item title="题目类型" ref="item">
   
           <ul class="all">
             <li v-on:click="all(index)" :class="{ active : active == index}" v-for="(item,index) in arr" :key="index" >{{ item }}</li>
         
           </ul>
  </van-dropdown-item>
  
    
</van-dropdown-menu>








    </div>
</template>

<script>
export default {
    data() {
        return {
             arr:["全部","已做","未做"],
             active:0
        }
    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    computed: {

    },
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
/deep/.van-dropdown-menu__title::after{
  font-size: 30px;
  border-color:transparent transparent #000 #000;
}

/deep/.van-dropdown-menu__title--active::after {
    border-color: transparent transparent currentColor currentColor;
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
