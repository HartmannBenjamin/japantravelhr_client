<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        @click:outside="hideCreateRequestModal"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add a new Request</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="valid">
              <v-col cols="12">
                <v-text-field
                    v-model="request.subject"
                    :rules="rules.subjectRules"
                    label="Subject"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    v-model="request.description"
                    :rules="rules.descriptionRules"
                    label="Description"
                    required
                ></v-textarea>
              </v-col>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              :disabled="!valid"
              color="blue darken-1"
              text
              @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import rulesConfig from '../config/FormRules'

  export default {
    name: 'CreateRequest',
    data() {
      return {
        dialog: true,
        valid: false,
        rules: rulesConfig,
        request: {
          subject: '',
          description: '',
        }
      }
    },
    methods: {
      hideCreateRequestModal() {
        this.$emit('hideCreateRequestModal');
      },

      submit() {
        this.loading = true;
        this.$store.dispatch('Requests/addRequest', this.request);
        this.hideCreateRequestModal();
        this.$toasted.show("New request added successfully", {
          icon : {
            name : 'done_outline',
            after : true
          },
          theme: "outline",
          position: "bottom-right",
          duration : 2000
        });
      }
    }
  }
</script>
