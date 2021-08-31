<template>
  <v-app>
    <Nav v-if="$auth.check()" />

    <v-main>
      <router-view />
    </v-main>

    <Footer v-if="$auth.check()" />
  </v-app>
</template>

<style>
@import "./assets/app.css";
</style>

<script>
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Nav,
    Footer,
  },
  computed: {
    _check() {
      return this.$auth.check();
    },
  },
  watch: {
    _check() {
      if (this.$auth.check()) {
        this.$store.dispatch('UserInfos/setUserName', this.$auth.user().name);
        this.$store.dispatch(
            'UserInfos/setUserImageUrl',
            this.$auth.user().image_url,
        );
      }
    },
  },
};
</script>
