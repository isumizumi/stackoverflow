<template>
  <div class="ui container" style="margin: 5%; padding: 5%; width: 40%; border-radius: 20%;">
    <div class="ui inverted segment grid container centered">
      <form class="ui inverted form" id="login-form" style="margin: 5%; padding: 5%;">
        <h1>Login</h1>
        <hr>
        <div class="required field">
          <label style="color: white">Username</label>
          <input v-model="username" name="username" placeholder="Username" type="text" required>
        </div>
        <div class="required field">
          <label style="color: white">Password</label>
          <input v-model="password" name="password" placeholder="Password" type="password" required>
        </div>
        <div class="login">
          <button v-on:click="Login" class="ui button" type="submit">Submit</button>
          <button><fbLogin></fbLogin></button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import fbLogin from './LoginFacebook'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  name: 'login',
  components: {
    fbLogin
  },
  methods: {
    Login() {
      axios.post('http://localhost:3000/signin', {
        username: this.username,
        password: this.password
      }).then( (response) => {
        if(response.data == "User not found") {
          console.log("Username or password error");
        } else {
          localStorage.setItem("Token", response.data)
          window.location.href = "/question"
        }
      }).catch( (error) => {
      })
    }
  }

}
</script>
