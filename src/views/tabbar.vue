import router from './router';
import package from '../package.json';
<template>
  <div class="box">


    <footer>
      <ul>
        <li
          :class="{active:$store.state.active == index }"
          v-on:click="tab(item,index)"
          v-for="(item,index) in list"
          :key="index"
        >
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon" />
          </svg>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      list: "",
      active: 0
    };
  },
  created() {
    this.list = this.$store.state.footer_list;

  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    tab(item, index) {
      
      this.$store.commit('active', index)

      if (this.list[index].name == "我的") {
        let token = localStorage.getItem("token");
        if (token) {
          this.$router.push({
            path: "person"
          });
        } else {
          this.$router.push({
            path: "login"
          });
        }
      } else {
        this.$router.push({
          path: item.path
        });
      }



    }
  }
};
</script>

<style lang="scss">

footer {
  width: 100%;
  height: 100px;
  display: inline-block;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;


  > ul {
    display: flex;
    > li {
      width: 20%;

      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      > .icon {
        font-size: 44px;
      }
    }
  }
}
.active {
  color: #ed711a;

}
</style>
