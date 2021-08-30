<template>
  <v-app id="inspire">
    <v-parallax
        dark
        style="height: 100%"
        :src="appUrl + 'logo/banner.png'"
    >
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <Register v-if="isRegisterPage"/>
            <Login v-else/>
          </v-flex></v-layout>
      </v-container>
    </v-parallax>
  </v-app>
</template>

<script>
import Login from '@/components/Login';
import Register from '@/components/Register';

export default {
  name: 'Auth',
  components: {
    Login,
    Register,
  },
  props: {
    isRegisterPage: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    this.$store.dispatch('Requests/setRequestsToNull');
  },
  computed: {
    appUrl() {
      return this.$appUrl;
    },
  },
};
</script>
