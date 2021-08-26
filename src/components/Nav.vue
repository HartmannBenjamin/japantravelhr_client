<template>
  <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="$vuetify.breakpoint.xsOnly"
      app
      left
      permanent
      touchless
  >
    <v-list color="blue lighten-5">
      <v-list-item :class="avatarItemClass">
        <v-list-item-avatar>
          <img :src="image_url" alt="profile picture">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <marquee-text :duration="20" :reverse="true" :paused="name.length < 10">
              {{ name }} ({{ $auth.user().role.name }})
              &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            </marquee-text>
          </v-list-item-title>

          <v-list-item-subtitle> {{ $auth.user().email }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link :to="{name: 'Profile'}">
        <v-list-item-icon>
          <v-icon> mdi-account </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> My Profile </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{name: 'Requests'}">
        <v-list-item-icon>
          <v-icon> mdi-form-dropdown </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ this.$auth.user().role.name ===  'User' ? 'My Requests' : 'Users Requests'}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{name: 'Project'}">
        <v-list-item-icon>
          <v-icon> mdi-file-powerpoint-outline </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Project Subject </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list color="grey lighten-5" class="pa-0 disconnect-btn">
      <v-list-item link @click.prevent="logOut" color="blue">
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
  import { mapGetters } from 'vuex'
  import MarqueeText from 'vue-marquee-text-component'

  export default {
    name: 'Nav',
    components: {
      MarqueeText
    },
    data() {
      return {
        drawer: true,
        avatarItemClass: this.$vuetify.breakpoint.xsOnly ? 'px-2' : 'px-5',
      }
    },
    computed: {
      ...mapGetters('UserInfos', {
        image_url: 'image_url',
        name: 'name',
      }),
    },
    methods: {
      logOut() {
        this.$auth.logout()

        this.$toasted.show("Log out successful", {
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
