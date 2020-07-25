<template>

</template>

<script>
export default {
  mounted() {
    if (this.$store.getters.user.provider == 'domain') {
      this.$store.dispatch('doDomainSignout')
        .then(response => {
          this.$router.push({ name: 'home' })
        })
    } else if (this.$store.getters.user.provider == 'google') {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then( () => {
        console.log('google signout')
        this.$store.commit('destroyUser')
        localStorage.removeItem('user')
        this.$router.push({ name: 'home' })
      })
    } else if (this.$store.getters.user.provider == 'facebook') {
      window.FB.logout(response => {
        console.log('facebook signout')
        this.$store.commit('destroyUser')
        localStorage.removeItem('user')
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>