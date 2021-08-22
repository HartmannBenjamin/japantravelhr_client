<template>
  <v-app>
    <Nav v-if="$auth.check()"/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<style>
  @import './assets/app.css';
</style>

<script>
  import Nav from '@/components/Nav'

  export default {
    name: 'App',
    components: {
      Nav
    },
    mounted() {

    },
  };
</script>
