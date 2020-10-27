<template>
  <div id="login_box">
    <div>
      <img
        src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019pILfAg7Avr1567732916.png"
        alt
      />

      <!-- 手机号登录 -->
      <div v-show="isShow">
        <div>
          <input type="text" v-model="user" placeholder="请输入手机号" name id />
          <input type="text" v-model="psw" placeholder="请输入密码" name id />
          <div>
            <span>找回密码</span>
            <span v-on:click="tab_login">注册/验证码登录</span>
          </div>
        </div>

        <button v-on:click="log">立即登录</button>
      </div>

      <!-- 验证码登录 -->
      <div v-show="!isShow">
        <div>
          <input type="text" v-model="user" placeholder="请输入手机号" name id />
          <input type="text" v-model="msm" placeholder="请输入短信验证码" name id />
          <div>
            <span>未注册的手机号将自动注册</span>
            <span v-on:click="tab_login">使用密码登录</span>
          </div>
          <button class="msm" v-on:click="msms">{{ lo }}</button>
        </div>

        <button v-on:click="login_msm">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, smsCode } from "../../http/api";
export default {
  data() {
    return {
      user: "",
      psw: "",
      msm: "",

      isShow: true,

      lo: "发送验证码"
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    log() {
      login({
        mobile: this.user,
        password: this.psw,
        type: 1
      }).then(res => {
        console.log(res);
        //判断是否登录成功
        if (res.data.code != 200) {
          this.$toast(res.data.msg);
          return false
        }
        this.$router.push({
          path:"person"
        })
     
        localStorage.setItem("token",`Bearer ${res.data.data.remember_token}`)

      });
    },

    // 切换验证码登录
    tab_login() {
      this.isShow = !this.isShow;
    },

    msms() {
      let num = 60
     let time =  setInterval(()=>{
    
        num--
       this.lo = `${num}S后重新发送`
       console.log( this.lo )
       if(num<=0){
            this.lo = `重新发送`
            window.clearInterval(time)

       }
      },1000)


      smsCode({
        mobile: this.user,
        sms_type: "login"
      }).then(res => {
        console.log(res)
      });
    },

    // 点击登陆的时候
    login_msm() {
      if (this.user == "" || this.msm == "") {
        this.$toast("请输入手机号验证码");
        return false;
      }

      login({
        mobile: this.user,
        sms_code: this.msm,
        type: 2
      }).then(res => {
        console.log(res);
        if (res.data.code != 200) {
          this.$toast(res.data.msg);
        }else{
        localStorage.setItem("token",`Bearer ${res.data.data.remember_token}`)
          this.$router.push({

            path:"person"

          })


        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
body,
html {
  height: 100%;
}
#login_box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1111;
  padding-top: 97px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  > div {
    width: 617px;
    height: 710px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* //图片 */
    > img {
      width: 617px;
      height: 114px;
    }
    > div {
      width: 617px;
      height: 473px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      > div {
        > input {
          width: 617px;
          height: 104px;
          border: 0;
          font-size: 31px;
        }

        > div {
          width: 617px;
          height: 104px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 24px;
          color: #a3a3a3;
        }
      }
      > button {
        width: 617px;
        height: 104px;
        background-color: #fd5702;
        border: 0;
        border-radius: 50px;
        color: #fff;
      }
    }
  }
}

.msm {
  position: absolute;
  right: 0;
  top: 50px;
  color: #da5b28;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0);
  border: 0;
}
</style>
