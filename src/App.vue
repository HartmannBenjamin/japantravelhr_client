<template>
  <v-app>
    <Nav v-if="$auth.check()"/>

    <v-main >
      <router-view/>
    </v-main>

    <Footer v-if="$auth.check()"/>
  </v-app>
</template>

<style>
  @import './assets/app.css';
</style>

<script>
  import Nav from '@/components/Nav'
  import Footer from '@/components/Footer'

  export default {
    name: 'App',
    components: {
      Nav,
      Footer
    },
    mounted() {

    },
  };
</script>
