<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <SubjectCard code="1821101"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SubjectCard from '@/components/SubjectCard.vue'
export default {
  name: 'home',
  components: {
    HelloWorld,
    SubjectCard
  }
}
</script>
