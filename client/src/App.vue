<template>
  <div id="app">
    <!-- <header>
      <app-nav></app-nav>
    </header> -->
    <!-- <main class="container"> -->
      <router-view></router-view>
    <!-- </main> -->
  </div>
</template>

<script>
// import AppNav from './components/AppNav';

import axios from 'axios'
import jwt from 'jwt-decode'

export default {
  data() {
    return {
      test: "test",
      objUser: ''
    }
  },
  name: 'app',
  methods: {},
  mounted: function() {
    if(localStorage.getItem("token") !== null) {
      this.objUser = jwt(localStorage.getItem("token"))._doc
    } else {
      this.objUser = ''
    }
  }
  // components: {
    // AppNav
  // }
}
