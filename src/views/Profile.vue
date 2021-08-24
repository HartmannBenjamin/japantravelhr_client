<template>
  <v-container
    style="width: 85%; background-color: rgb(243,246,246);
    border-radius: 2px"
    class="align-center mt-10 mb-5"
  >
    <v-row class="ma-3 mt-0 d-flex justify-space-between">
      <v-col>
        <h1> My Profile </h1>
      </v-col>

      <v-card outlined class="mt-1" v-if="!$vuetify.breakpoint.xsOnly">
          <v-list-item>
            <v-list-item-avatar>
              <img :src="image_url" alt="profile picture">
            </v-list-item-avatar>

              <v-list-item-content style="width: 200px">
              <v-list-item-title> {{ name }} ({{ $auth.user().role.name }}) </v-list-item-title>
              <v-list-item-subtitle> {{ $auth.user().email }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
      </v-card>
    </v-row>

    <v-divider></v-divider>

    <v-container class="pa-6">
      <v-form v-model="valid">
        <v-container>
          <v-text-field
              :rules="rules.nameRules"
              v-model="user.name"
              label="Name"
              required
          ></v-text-field>
          <v-text-field
              label="E-mail"
              :value="$auth.user().email"
              disabled
          ></v-text-field>
          <v-text-field
              label="Role"
              :value="$auth.user().role.name"
              disabled
          ></v-text-field>
          <v-text-field
              v-model="user.password"
              :rules="[passwordRule]"
              label="Password"
              type="password"
              required
          ></v-text-field>
          <v-text-field
              v-model="user.c_password"
              :rules="[passwordConfirmationRule]"
              :disabled="!user.password"
              onCopy="return false"
              onDrag="return false"
              onDrop="return false"
              onPaste="return false"
              label="Confirm Password"
              type="password"
              required
          ></v-text-field>
          <v-file-input
              v-model="image"
              :rules="rules.imageRules"
              @change="selectFile"
              :error-messages="wrongExtensionImage ? 'This extension is not supported' : ''"
              label="Change your profile picture"
              prepend-icon="mdi-camera"
          ></v-file-input>

          <v-card-actions class="mt-8">
            <v-spacer></v-spacer>
            <v-btn @click="submit" outlined elevation="5" :loading="loading" :disabled="!valid">
              Update information
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
  import rulesConfig from '../config/FormRules'
  import {mapGetters} from "vuex";

  export default {
    name: 'Profile',
    data() {
      return {
        rules: rulesConfig,
        valid: true,
        loading: false,
        user: {
          name: this.$auth.user().name,
          password: '',
          c_password: '',
        },
        roles: [],
        image_file: null,
        acceptedExtension: ['jpg', 'png'],
        wrongExtensionImage: false,
        image: null,
      }
    },
    computed: {
      passwordRule() {
        if (this.user.password) {
          return (v) => (v && v.length < 21 && v.length > 3) || 'Password must be between 4 and 20 characters'
        }
        return true;
      },

      passwordConfirmationRule() {
        if (this.user.password) {
          return () => (this.user.password === this.user.c_password) || 'Password must match'
        }
        return true;
      },
      ...mapGetters('UserInfos', {
        image_url: 'image_url',
        name: 'name',
      }),
    },
    methods: {
      submit() {
        if (!this.valid || this.wrongExtensionImage) {
          return
        }

        this.loading = true;

        this.$http.put('update', this.user)
            .then((response) => {
              const user = response.data.data.user;

              this.$toasted.show("Information updated successfully", {
                icon : {
                  name : 'done_outline',
                  after : true
                },
                theme: "outline",
                position: "bottom-right",
                duration : 2000
              });

              this.loading = false
              this.user.password = ''
              this.user.c_password = ''
              this.$store.dispatch('UserInfos/setUserName', user.name)

              if (this.image_file !== null) {
                let formData = new FormData();

                formData.append("file", this.image_file);
                formData.append("userEmail", user.email);

                this.$http.post('uploadImage', formData, {
                  headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res) => {
                  this.$store.dispatch('UserInfos/setUserImageUrl', res.data.data.user.image_url)
                  this.image = null;
                })
              }
        })
        .catch((error) => {
          this.loading = false;

          this.$toasted.show(error, {
            icon : {
              name : 'error',
              after : true
            },
            theme: "bubble",
            position: "bottom-right",
            duration : 2000
          });
        });
      },

      selectFile(file) {
        if (!file) {
          return
        }

        const extension = file.name.split('.').pop();

        if (this.acceptedExtension.some(x => x.toLowerCase() === extension.toLowerCase())) {
          this.image_file = file;
          this.wrongExtensionImage = false;
        } else {
          this.wrongExtensionImage = true;
        }
      },

      eventMethode(event) {
        if (event.keyCode === 13) {
          if (this.valid) {
            this.submit()
          }
        }
      }
    },
    mounted() {
      window.addEventListener('keyup', this.eventMethode)

      this.$http.get('roles').then((response) => {
        this.roles = response.data.data
      });
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.eventMethode)
    },
  }
</script>