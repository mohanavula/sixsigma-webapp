<template>
  <div id="app" class="antialiased text-gray-900 bg-gray-200 min-h-screen">
      <Navbar />
      <!-- <div id="nav" class="bg-gray-200 min-h-screen">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div> -->
    <router-view/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'

  export default {
    name: 'app',
    components: {
      Navbar
    },
  }
</script>

<style src="./assets/css/tailwind.css">

</style>
 