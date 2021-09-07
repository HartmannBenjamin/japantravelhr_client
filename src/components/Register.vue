<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="grey">
      <v-toolbar-title>
        Register form - <span style="font-weight: 100">Japan Travel HR </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <img
        class="img-logo"
        draggable="false"
        :src="appUrl + 'logo/logo.png'"
        alt="logo"
      />
    </v-toolbar>

    <v-container>
      <v-form v-model="valid">
        <v-container>
          <v-text-field
            :rules="rules.nameRules"
            v-model="user.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            :rules="rules.emailRules"
            v-model="user.email"
            label="E-mail"
            :error-messages="emailAvailable ? '' : message.emailNotAvailable"
            @change="checkIfEmailAvailable"
            required
          ></v-text-field>
          <v-select
            v-model="user.role_id"
            :rules="[(v) => !!v || message.roleRequired]"
            :items="roles"
            item-text="name"
            item-value="id"
            label="Role"
            data-cy="select-role"
            required
          ></v-select>
          <v-text-field
            :type="passwordType ? 'password' : 'text'"
            :append-icon="passwordType ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="passwordType = !passwordType"
            v-model="user.password"
            :rules="rules.passwordRules"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            :type="passwordType ? 'password' : 'text'"
            v-model="user.c_password"
            :rules="[
              rules.passwordConfirmationRule(user),
              (v) => !!v || message.fieldRequired,
            ]"
            :disabled="!user.password"
            onCopy="return false"
            onDrag="return false"
            onDrop="return false"
            onPaste="return false"
            label="Confirm Password"
            required
          ></v-text-field>
          <v-file-input
            :rules="rules.imageRules"
            @change="selectFile"
            :error-messages="
              wrongExtensionImage ? message.imageExtensionNotSupported : ''
            "
            label="Choose your profile picture"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions class="pt-6">
        <Button @click="$router.replace({ name: 'Login' })">
          <v-icon> mdi-account-arrow-right </v-icon>
          Login Page
        </Button>

        <v-spacer></v-spacer>

        <Button
          style="width: 130px"
          type="primary"
          :disabled="!valid"
          :loading="loading && !$vuetify.breakpoint.xsOnly"
          @click="submit"
        >
          <div v-if="!loading || $vuetify.breakpoint.xsOnly">
            <v-icon color="white" class="pr-1"> mdi-account-plus </v-icon>
            Register
          </div>
        </Button>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import notifications from '../config/Notifications';
import rulesConfig from '../config/FormRules';
import message from '../config/Messages';
import {fileHasValidExtension} from '@/services/Functions';
import {
  sendErrorNotification,
  sendNotification,
} from '@/services/NotificationService';

export default {
  name: 'Register',
  data: () => ({
    message: message,
    valid: false,
    loading: false,
    rules: rulesConfig,
    roles: [],
    image_file: null,
    emailAvailable: true,
    passwordType: true,
    wrongExtensionImage: false,
    user: {
      name: '',
      email: '',
      role_id: '',
      password: '',
      c_password: '',
    },
  }),
  methods: {
    checkIfEmailAvailable() {
      this.$http
          .post('emailAvailable', {email: this.user.email})
          .then((response) => {
            this.emailAvailable = response.data.data;
          });
    },

    submit() {
      if (!this.emailAvailable || this.wrongExtensionImage) {
        return;
      }

      this.loading = true;

      this.$auth
          .register({
            params: this.user,
          })
          .then(
              (response) => {
                if (response.data.success) {
                  if (this.image_file !== null) {
                    const formData = new FormData();

                    formData.append('file', this.image_file);
                    formData.append('userEmail', response.data.data.user.email);

                    this.$http.post('uploadImage', formData, {
                      headers: {
                        'Authorization': 'bearer ' + response.data.data.token,
                        'Content-Type': 'multipart/form-data',
                      },
                    }).then((res) => {
                      if (res.data.success) {
                        sendNotification(notifications.userRegistered);
                      } else {
                        sendErrorNotification(res.data.message);
                      }
                    }).catch(sendErrorNotification);
                  }
                } else {
                  sendErrorNotification(response.data.message);
                }
              },
              (error) => {
                sendErrorNotification(error);
                this.loading = false;
              },
          );
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

    eventMethod(event) {
      if (event.keyCode === 13) {
        if (this.valid && !this.wrongExtensionImage) {
          this.submit();
        }
      }
    },
  },
  computed: {
    appUrl() {
      return this.$appUrl;
    },
  },
  mounted() {
    this.$http.get('roles').then((response) => {
      this.roles = response.data.data;
    });

    window.addEventListener('keyup', this.eventMethod);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.eventMethod);
  },
};
</script>
