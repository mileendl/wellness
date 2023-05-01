<template>
  <NavBar />
  <router-view class="container my-4" />
</template>
<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar: NavBar
  }
}
</script>