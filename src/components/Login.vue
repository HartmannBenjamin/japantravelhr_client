<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="grey">
      <v-toolbar-title>Login form - <span style="font-weight: 100;"> Japan Travel HR </span></v-toolbar-title>
      <v-spacer></v-spacer>
      <img class="img-logo" draggable="false" :src="'http://127.0.0.1:8000/logo/logo.png'" alt="logo">
    </v-toolbar>
    <v-container>
      <v-form v-model="valid">
        <v-container>
          <v-text-field
              v-model="user.email"
              :rules="rules.emailRules"
              label="E-mail"
              required
          ></v-text-field>
          <v-text-field
              :type="'password'"
              v-model="user.password"
              :rules="rules.passwordRules"
              label="Password"
              required
          ></v-text-field>
        </v-container>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions class="pt-6">
        <Button @click="$router.replace({name: 'Register'})">
          <v-icon class="pr-1"> mdi-account-plus  </v-icon>
          Register Page
        </Button>
        <v-spacer></v-spacer>
        <Button style="width: 100px" type="primary" :disabled="!valid" :loading="loading" @click="submit">
          <div v-if="!loading">
            <v-icon color="white"> mdi-account-arrow-right  </v-icon>
            Login
          </div>
        </Button>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
  import rulesConfig from '../config/FormRules'

  export default {
    name: 'Login',
    data: () => ({
      valid: false,
      loading: false,
      user: {
        email: '',
        password: '',
      },
      rules: rulesConfig
    }),
    methods: {
      submit () {
        this.loading = true;

        this.$auth
            .login({
              params: this.user,
              rememberMe: true,
            })
            .then(() => {
              this.$toasted.show("Log in successfully", {
                icon : {
                  name : 'done_outline',
                  after : true
                },
                theme: "outline",
                position: "bottom-right",
                duration : 2000
              });
            }, () => {
              this.$toasted.show("Log in successfully", {
                icon : {
                  name : 'Error',
                  after : true
                },
                theme: "outline",
                position: "bottom-right",
                duration : 2000
              });
              this.loading = false;
            });
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
    },
    beforeDestroy() {
      window.removeEventListener('keyup', this.eventMethode)
    }
  }
</script>
