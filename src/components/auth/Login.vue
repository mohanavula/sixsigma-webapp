<template>
  <div class="container mx-auto pt-2">
    <div class="inputs w-full max-w-2xl p-6 mx-auto">
      <h2 class="text-2xl text-gray-900">Login</h2>
      <form class="mt-6 border-t border-gray-400 pt-4" @submit.prevent="login" @keypress="error_message = null">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-full px-3 mb-6" v-if="error_message">
            <p class=" bg-red-100 border border-red-400 rounded text-sm text-red-400 px-3 py-3">
              {{ error_message }}
            </p>
          </div>
          <div class="w-full md:w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="username"
            >Email</label>
            <input
              class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
              name="username"
              id="username"
              v-model="username"
              type="email"
              required
            />
          </div>
          <div class="w-full md:w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="password"
            >Password</label>
            <input
              class="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none focus:border-gray-500"
              name="password"
              id="password"
              v-model="password"
              type="password"
              required
            />
          </div>
          <div class="w-full md:w-full px-3 mb-6">
            <button
              class="inline-block appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md focus:outline-none hover:border-gray-500 focus:border-gray-500"
              type="submit" :class="loading ? 'opacity-50 cursor-not-allowed' : '' "
              :disabled="loading"
            >
              <img src="../../assets/spinner.gif" style="width: 20px" class="inline pr-2" v-if="loading">
              <span>Login</span>
            </button>
            <div class="ml-4 inline-block py-1" id="google-signin-btn"></div>
          </div>
        </div>
      </form>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      error_message: "",
      loading: false,
    };
  },

  mounted() {
    gapi.signin2.render('google-signin-btn', {
      onsuccess: this.onSignIn
    })
  },

  methods: {
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    },

    login() {
      if (this.username.trim() == "" || this.password.trim() == "") {
        error_message = 'Please enter both email and password'
        return
      }
      this.loading = true
      this.$store
        .dispatch("retrieveToken", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "about" });
          this.loading = false
        })
        .catch(response => {
          // console.log(response)
          this.error_message = "Cannot login. Please try again"
          this.loading = false
        });
    }
  }
};
</script>