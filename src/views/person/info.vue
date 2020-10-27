
<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft">
      <!-- <template #right>
          <svg class="iconn" @click="showPopup" aria-hidden="true">
            <use xlink:href="#icon-fenxiang" />
          </svg>
      </template>-->
    </van-nav-bar>

    <!-- 信息区域 -->

    <div class="content">
      <!-- <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
      />-->
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <ul class="ul">
          <li>
            <label>
              拍照
              <input type="file" accept="image/*" capture="camera" @change="paishe($event)" />
            </label>
          </li>
          <li>
            <label>
              从手机相册中选择
              <input type="file" accept="image/*" capture="camera" @change="paishe($event)" />
            </label>
          </li>
          <li v-on:click="out">取消</li>
        </ul>
      </van-popup>
      <ul>
        <li v-on:click="foher">
          <p>头像</p>

          <div>
            <img :src="img" alt />

            <p>></p>
          </div>
        </li>

        <li>
          <p>昵称</p>

          <div>
            <img :src="info.avatar" alt />
            <p>></p>
          </div>
        </li>
        <li>
          <p>手机号</p>

          <div>
            <img :src="info.avatar" alt />
            <p>></p>
          </div>
        </li>
        <li>
          <p>性别</p>

          <div>
            <img :src="info.avatar" alt />
            <p>></p>
          </div>
        </li>
        <li>
          <p>出生日期</p>

          <div>
            <img :src="info.avatar" alt />
            <p>></p>
          </div>
        </li>
        <li>
          <p>所在城市</p>

          <div>
            <img :src="info.avatar" alt />
            <p>></p>
          </div>
        </li>
        <li>
          <p>学科</p>

          <div>
            <img :src="info.avatar" alt />
            <p>></p>
          </div>
        </li>
        <li>
          <p>年纪</p>

          <div>
            <img :src="info.avatar" alt />
            <p>></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { info , img , getimg } from "../../http/api";
export default {
  data() {
    return {
      info: "",
      show: false,
      img:''
    };
  },
  created() {
    let token = localStorage.getItem("token");
    info(token).then(res => {
      console.log(res);
      this.info = res.data.data;
      this.img = info.avatar
    });
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    //点击回退
    onClickLeft() {
      this.$router.go(-1);
    },

    //获取头像
    foher() {
      this.show = !this.show;
    },
    out() {
      this.show = !this.show;
    },
    paishe(e) {

      let formData = new FormData();
    this.show = false
      formData.append("file", e.target.files[0]);
      //获取地址的接口
      img(formData).then(res=>{
        console.log(res.data.data.path)

         if (res.data.code === 200) {

          //  更新新头像
           getimg({avatar: res.data.data.path}).then(res=>{
    
             this.img = res.data.data.avatar
              
           })

         }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.ul {
  > li {
    height: 100px;
    width: 100%;
    text-align: center;
    line-height: 100px;
    > label {
      display: block;
      height: 100px;
      width: 100%;
      text-align: center;
      line-height: 100px;
      > input {
        display: none;
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
.van-nav-bar,
.van-action-sheet__cancel,
.van-action-sheet__item {
  height: 85px;
}
/deep/.van-popup--bottom.van-popup--round {
  border-radius: 0;
}
// 内容区域
.content {
  padding-top: 22px;
  background-color: #f0f2f5;
  > ul {
    background-color: #fff;
    display: flex;

    justify-content: center;
    align-items: center;
    flex-direction: column;
    > li {
      background-color: #fff;
      width: 706px;
      height: 120px;
      border-bottom: 4px solid #fafafa;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > p {
        font-size: 22px;
      }
      > div {
        display: flex;
        align-items: center;
        > img {
          width: 73px;
          height: 73px;
          border-radius: 100%;
        }
        > p {
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
