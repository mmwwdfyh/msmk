import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import practise from "../views/practise.vue";
import search from "../views/search.vue";
import record from "../views/record.vue";
import course from "../views/course.vue";
import login from "../views/login/login.vue";
import set_pass from "../views/login/set_pass.vue";
import set_message from "../views/login/set_message.vue";
import person from "../views/person.vue";
import oto from "../views/person/oto.vue";
import teacher from "../views/home/teacher.vue";
import oto_plan from "../views/home/teacher/oto_plan.vue";
import courseInfo from "../views/home/courseInfo.vue";
import concern from "../views/person/concern.vue";
import collect from "../views/person/collect.vue";

// 课程详情页面的立即学习
import study_detail from "../views/home/courseInfo/study_detail.vue";
//视频
import video from "../views/home/courseInfo/video.vue";
Vue.use(VueRouter);
import info from "../views/person/info.vue";

//练习页面
 
import point from"../views/practise/point.vue"
import paper_package from"../views/practise/paper_package.vue"
import exam from"../views/practise/exam.vue"
import error_ques from"../views/practise/error_ques.vue"
import assess from"../views/practise/assess.vue"
import ques_collect from"../views/practise/ques_collect.vue"
import ti from"../views/practise/ti.vue"
import ques from"../views/practise/ques.vue"



// 我的页面

const routes = [
  // 主页
  {
    path: "/",
    name: "Home",
    component: Home

  },
  // 特色课
  {
    path: "/course",
    name: "course",
    component: course

  },
  // 练习
  {
    path: "/practise",
    name: "practise",
    component: practise

  },
  //约课记录
  {
    path: "/record",
    name: "record",
    component: record

  },
  //登录
  {
    path: "/login",
    name: "login",
    component: login,




  },
  // 验证码
  {
    path: "/set_pass",
    name: "set_pass",
    component: set_pass
  },
  // 确认密码
  {
    path: "/set_message",
    name: "set_message",
    component: set_message
  },
  // 我的页面
  {
    path: "/person",
    name: "person",
    component: person,

  },
  // 一对一页面
  {
    path: "/oto",
    name: "oto",
    component: oto
  },
  // 老师详情
  {
    path: "/teacher/:id",
    name: "teacher",
    component: teacher
  },

  //课程详情
  {
    path: "/courseInfo/:id",
    name: "courseInfo",
    component: courseInfo
  },
  //关注的老师
  {
    path: "/concern",
    name: "concern",
    component: concern
  },
  //收藏
  {
    path: "/collect",
    name: "collect",
    component: collect
  },

  //立即学习页面
  {
    path: "/study_detail/:id",
    name: "study_detail",
    component: study_detail
  },
    {
    path: "/info",
    name: "info",
    component: info

  },

// 我的信息
 
    {
    path: "/video/:title",
    name: "video",
    component: video

  },
  {
    path: "/oto_plan/:id",
    name: "oto_plan",
    component: oto_plan

  },


  //搜索
  {
    path: "/search",
    name: "search",
    component: search

  },


  //考点练习
  {
    path: "/point",
    name: "point",
    component: point

  },
  //套卷联系
  {
    path: "/paper_package",
    name: "paper_package",
    component: paper_package

  },
  // 仿真模考
  {
    path: "/exam",
    name: "exam",
    component: exam

  },
  // 错题练习
  {
    path: "/error_ques",
    name: "error_ques",
    component: error_ques

  },
  // 测评记录
  {
    path: "/assess",
    name: "assess",
    component: assess

  },
  // 习题收藏
  {
    path: "/ques_collect",
    name: "ques_collect",
    component: ques_collect

  },
  {
    path: "/ti",
    name: "ti",
    component: ti

  },
  {
    path: "/ques/:id",
    name: "ques",
    component: ques

  },
];

const router = new VueRouter({
  routes
});

export default router;