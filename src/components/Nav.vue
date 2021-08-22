<template>
  <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="$vuetify.breakpoint.xsOnly"
      permanent
      absolute
      left
      app
  >
    <v-list color="grey lighten-2">
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img :src="$auth.user().image_url" alt="profile picture">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title> {{ $auth.user().name }} ({{ $auth.user().role.name }}) </v-list-item-title>
          <v-list-item-subtitle> {{ $auth.user().email }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon> mdi-account </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title> My Profile </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link v-if="$auth.user().role.name === 'User'">
        <v-list-item-icon>
          <v-icon> mdi-form-dropdown </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title> My Requests </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link @click.prevent="logOut">
        <v-list-item-icon>
          <v-icon> mdi-logout-variant </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title> Disconnect </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data() {
      return {
        drawer: true,
        mini: true,
      }
    },
    methods: {
      logOut() {
        this.$auth.logout()

        this.$toasted.show("Log out successfully", {
          icon : {
            name : 'exit_to_app',
            after : true
          },
          theme: "outline",
          position: "bottom-right",
          duration : 2000,
        });
      }
    }
  }
</script>
