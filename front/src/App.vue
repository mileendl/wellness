<template>
  <div>
    <NavBar />
    <div class="container my-4">
      <router-view />
    </div>
  </div>
</template>
<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar: NavBar,
  },
};
</script>