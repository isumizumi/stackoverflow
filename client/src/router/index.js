import Vue from 'vue'
import Router from 'vue-router'
import jwt_decode from 'jwt-decode'

import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import ManageQuestions from '@/components/ManageQuestions'

Vue.use(Router)

function checkToken(to, from, next) {
  //let decoded = jwt.decode(localStorage.getItem("token"), "Kelompok3Hacktiv8")
  if(localStorage.getItem("token") !== null) {
    console.log(jwt_decode(localStorage.getItem("token"))._doc);
    next()
  }
  else
    to('/home')
}

export default new Router({
  mode: "history",

  routes: [
    { path: '/', alias: '/login', component: Login },
    { path: '/user', alias: '/profile', component: Profile },
    { path: '/exit', alias: '/logout', component: Logout },
    { path: '/questions', name: 'Kepo-slow Panel', component: ManageQuestions,
      beforeEnter: (to, from, next) => {
        //let decoded = jwt.decode(localStorage.getItem("token"), "Kelompok3Hacktiv8")
        if(localStorage.getItem("token") !== null) {
          next()
        }
        else
          window.location.href='/login'
      }
    }
  ]
})
