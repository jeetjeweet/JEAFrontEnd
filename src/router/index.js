import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Axios from 'axios';
import VueAxios from 'vue-axios';
import Home from "@/components/Home";
import Profile from "@/components/Profile";
import Chat from "@/components/Chat";
import Register from "@/components/Register";

Vue.use(Router, Axios, VueAxios);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/Hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path:'/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/chat/:username',
      name: 'chat',
      component: Chat,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
});


router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/');
  }

  next();
});

