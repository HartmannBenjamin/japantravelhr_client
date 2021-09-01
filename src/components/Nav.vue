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
          <img :src="image_url" alt="profile picture" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <marquee-text
              :duration="20"
              :reverse="true"
              :paused="name.length < 10"
            >
              {{ name }} ({{ $auth.user().role.name }})
              &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
            </marquee-text>
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ $auth.user().email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link :to="{ name: 'Profile' }">
        <v-list-item-icon>
          <v-icon> mdi-account </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> My Profile </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Requests' }">
        <v-list-item-icon>
          <v-icon> mdi-form-dropdown </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{
              this.$auth.user().role.name === "User"
                ? "My Requests"
                : "Users Requests"
            }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="{ name: 'Project' }">
        <v-list-item-icon>
          <v-icon> mdi-file-powerpoint-outline </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Project Subject </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list color="grey lighten-5" class="pa-0 disconnect-btn">
      <v-list class="pa-0 pb-10">
        <v-list-item
          link
          dense
          style="background-color: #ffe7b1"
          href="https://www.postman.com/benjaminhartmann/workspace/japantravelhr/overview"
          target="_blank"
        >
          <v-list-item-icon>
            <v-icon> mdi-account-group </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Postman workspace </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          dense
          style="background-color: #e5e1dc"
          href="https://documenter.getpostman.com/view/17271595/TzzHksRe"
          target="_blank"
        >
          <v-list-item-icon>
            <v-icon> mdi-api </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> API Documentation </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          dense
          style="background-color: #fdfdfd"
          href="https://github.com/HartmannBenjamin/japantravelhr_client"
          target="_blank"
        >
          <v-list-item-icon>
            <v-icon> mdi-github </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Front-end repository </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          dark
          dense
          style="background-color: #707070"
          href="https://github.com/HartmannBenjamin/japantravelhr_backend"
          target="_blank"
        >
          <v-list-item-icon>
            <v-icon> mdi-github </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Back-end repository </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-item
        link
        @click.prevent="logOut"
        data-test="disconnect"
        style="background-color: #e7e7e7"
      >
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
import notifications from '../config/Notifications';
import {mapGetters} from 'vuex';
import MarqueeText from 'vue-marquee-text-component';

export default {
  name: 'Nav',
  components: {
    MarqueeText,
  },
  data() {
    return {
      drawer: true,
      avatarItemClass: this.$vuetify.breakpoint.xsOnly ? 'px-2' : 'px-5',
    };
  },
  computed: {
    ...mapGetters('UserInfos', {
      image_url: 'image_url',
      name: 'name',
    }),
  },
  methods: {
    logOut() {
      this.$auth
          .logout({})
          .then(() => {
            this.$toasted.show(notifications.userLogout, {
              icon: {
                name: 'exit_to_app',
                after: true,
              },
              theme: 'outline',
              position: 'bottom-right',
              duration: 2000,
            });
          })
          .catch((error) => {
            this.$toasted.show(error, {
              icon: {
                name: 'error',
                after: true,
              },
              theme: 'bubble',
              position: 'bottom-right',
              duration: 2000,
            });
          });
    },
  },
};
</script>
