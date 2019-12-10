<template>
  <div class="wrapper">
    <div class="main-panel">
      <nav-bar>
      </nav-bar>
      <dashboard-content>
      </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import NavBar from "./NavBar.vue";
import DashboardContent from "./Content.vue";
export default {
  name: "page",
  components: {
    NavBar,
    DashboardContent,
  },
};
</script>
