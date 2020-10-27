<template>
  <div class="psw_box">
    <div>
      <h1>设置密码</h1>
    </div>
    <div class="pswbox">
      <div>
        <input type="text"  placeholder="请设置登陆密码" name id />
        <input type="text"  placeholder="请确认登录密码" name id />
      </div>

      <button >确定</button>
    </div>
    <span v-on:click="jup">跳过</span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
jup(){
    this.$router.push({
        path:'set_message'
    })
}



  }
};
</script>

<style scoped>
body,
html {
  height: 100%;
}
.psw_box{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1111;
}
h1 {
  width: 100%;
  height: 100px;
  font-size: 40px;
  text-align: center;
  line-height: 100px;
}

span {
  position: absolute;
  right: 0;
  top: 30px;
}
input {
  width: 617px;
  height: 104px;
  border: 0;
  font-size: 31px;
}
button {
  width: 617px;
  height: 104px;
  background-color: #fd5702;
  border: 0;
  border-radius: 50px;
  color: #fff;
}
.pswbox{
         width: 617px;
    height: 410px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
}

</style>
