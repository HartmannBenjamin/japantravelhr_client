<template>
  <v-container class="align-center mt-10 mb-5 background-container">
    <v-row class="ma-3 mt-0 d-flex justify-space-between">
      <v-col>
        <h1>My Profile</h1>
      </v-col>

      <v-card outlined class="mt-1">
        <v-list-item>
          <v-list-item-avatar>
            <img :src="image_url" alt="profile picture" />
          </v-list-item-avatar>

          <v-list-item-content style="width: 200px">
            <v-list-item-title data-test="name">
              {{ name }} ({{ $auth.user().role.name }})
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $auth.user().email }}
            </v-list-item-subtitle>
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
            :type="passwordType ? 'password' : 'text'"
            :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="passwordType = !passwordType"
            v-model="user.password"
            :rules="[rules.passwordRule(user)]"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            :type="passwordType ? 'password' : 'text'"
            v-model="user.c_password"
            :rules="[rules.passwordConfirmationRule(user)]"
            :disabled="!user.password"
            onCopy="return false"
            onDrag="return false"
            onDrop="return false"
            onPaste="return false"
            label="Confirm Password"
            required
          ></v-text-field>
          <v-file-input
            v-model="image"
            :rules="rules.imageRules"
            @change="selectFile"
            :error-messages="
              wrongExtensionImage ? message.imageExtensionNotSupported : ''
            "
            label="Change your profile picture"
            prepend-icon="mdi-camera"
          ></v-file-input>

          <v-card-actions class="mt-8">
            <v-spacer></v-spacer>

            <v-btn
              @click="submit"
              outlined
              elevation="5"
              :loading="loading"
              :disabled="!valid"
            >
              Update information
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import notifications from '../config/Notifications';
import rulesConfig from '../config/FormRules';
import message from '../config/Messages';
import {mapGetters} from 'vuex';
import {fileHasValidExtension} from '@/services/Functions';
import {
  sendErrorNotification,
  sendNotification,
} from '@/services/NotificationService';

export default {
  name: 'Profile',
  data() {
    return {
      valid: true,
      loading: false,
      message: message,
      rules: rulesConfig,
      roles: [],
      passwordType: true,
      image_file: null,
      wrongExtensionImage: false,
      image: null,
      user: {
        name: this.$auth.user().name,
        password: '',
        c_password: '',
      },
    };
  },
  computed: {
    ...mapGetters('UserInfos', {
      image_url: 'image_url',
      name: 'name',
    }),
  },
  methods: {
    submit() {
      if (!this.valid || this.wrongExtensionImage) {
        return;
      }

      this.loading = true;

      this.$http
          .put('update', this.user)
          .then((response) => {
            const user = response.data.data;

            this.$store.dispatch('UserInfos/setUserName', user.name);

            if (this.image_file !== null) {
              const formData = new FormData();

              formData.append('file', this.image_file);
              formData.append('userEmail', user.email);

              this.$http
                  .post('uploadImage', formData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                  })
                  .then((res) => {
                    this.resetForm(res.data);
                    this.$store.dispatch(
                        'UserInfos/setUserImageUrl',
                        res.data.data.image_url,
                    );
                  });
            } else {
              this.resetForm(response.data);
            }
          })
          .catch((error) => {
            this.loading = false;
            sendErrorNotification(error);
          });
    },

    selectFile(file) {
      if (!file) {
        return;
      }

      if (fileHasValidExtension(file)) {
        this.image_file = file;
        this.wrongExtensionImage = false;
      } else {
        this.wrongExtensionImage = true;
      }
    },

    resetForm(data) {
      if (data.success) {
        sendNotification(notifications.userInformationUpdated);
      } else {
        sendErrorNotification(data.message);
      }

      this.loading = false;
      this.user.password = '';
      this.user.c_password = '';
      this.image = null;
    },

    eventMethod(event) {
      if (event.keyCode === 13) {
        if (this.valid) {
          this.submit();
        }
      }
    },
  },
  mounted() {
    window.addEventListener('keyup', this.eventMethod);

    this.$http.get('roles').then((response) => {
      this.roles = response.data.data;
    });
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.eventMethod);
  },
};
</script>
