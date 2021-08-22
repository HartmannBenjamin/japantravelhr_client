<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="grey">
      <v-toolbar-title>Register form - <span style="font-weight: 100;"> Japan Travel HR </span></v-toolbar-title>
      <v-spacer></v-spacer>
      <img class="img-logo" draggable="false"  :src="'http://127.0.0.1:8000/logo/logo.png'" alt="logo">
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
              autocomplete="off"
              :rules="rules.emailRules"
              v-model="user.email"
              label="E-mail"
              :error-messages="emailAvailable ? '' : 'This email is not available.'"
              @input="checkIfEmailAvailable"
              required
          ></v-text-field>
          <v-select
              v-model="user.role_id"
              :rules="[v => !!v || 'Role is required']"
              :items="roles"
              item-text="name"
              item-value="id"
              label="Role"
          ></v-select>
          <v-text-field
              v-model="user.password"
              :rules="rules.passwordRules"
              label="Password"
              type="password"
              required
          ></v-text-field>
          <v-text-field
              v-model="user.c_password"
              :rules="[passwordConfirmationRule, v => !!v || 'This field is required']"
              onCopy="return false"
              onDrag="return false"
              onDrop="return false"
              onPaste="return false"
              label="Confirm Password"
              type="password"
              required
          ></v-text-field>
          <v-file-input
              :rules="rules.imageRules"
              @change="selectFile"
              :error-messages="wrongExtensionImage ? 'This extension is not supported' : ''"
              label="Choose your profile picture"
              prepend-icon="mdi-camera"
          ></v-file-input>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions class="pt-6">
        <Button @click="$router.replace({name: 'Login'})">
          <v-icon> mdi-account-arrow-right  </v-icon>
          Login Page
        </Button>

        <v-spacer></v-spacer>

        <Button style="width: 130px" type="primary" :disabled="!valid" :loading="loading" @click="submit">
          <div v-if="!loading">
            <v-icon color="white" class="pr-1"> mdi-account-plus  </v-icon>
            Register
          </div>
        </Button>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
  import rulesConfig from '../config/FormRules'

  export default {
    name: 'Register',
    data: () => ({
      rules: rulesConfig,
      valid: false,
      loading: false,
      user: {
        name: '',
        email: '',
        role_id: '',
        password: '',
        c_password: '',
      },
      roles: [],
      image_file: null,
      emailAvailable: true,
      acceptedExtension: ['jpg', 'png'],
      wrongExtensionImage: false,
    }),
    computed: {
      passwordConfirmationRule() {
        return () => (this.user.password === this.user.c_password) || 'Password must match'
      },
    },
    methods: {
      checkIfEmailAvailable() {
        this.$http.post('emailAvailable', {email: this.user.email}).then((response) => {
          this.emailAvailable = response.data.data;
        })
      },

      submit() {
        if (!this.emailAvailable || this.wrongExtensionImage) {
          return
        }

        this.loading = true;

        this.$auth.register({
          params: this.user,
        }).then((response) => {
          let formData = new FormData();

          formData.append("file", this.image_file);
          formData.append("userEmail", response.data.data.user.email);

          this.$http.post('uploadImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
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
          if (this.valid && !this.wrongExtensionImage) {
            this.submit()
          }
        }
      },
    },
    mounted() {
      this.$http.get('roles').then((response) => {
        this.roles = response.data.data
      });

      window.addEventListener('keyup', this.eventMethode)
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.eventMethode)
    }
  }
</script>
