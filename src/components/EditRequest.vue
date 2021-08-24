<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        @click:outside="hideEditRequestModal"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit the Request</span>
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
    name: 'EditRequest',
    props: {
      requestToEdit: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        dialog: true,
        valid: false,
        rules: rulesConfig,
        request: {
          subject: this.requestToEdit.subject,
          description: this.requestToEdit.description,
        }
      }
    },
    methods: {
      hideEditRequestModal() {
        this.$emit('hideEditRequestModal');
      },

      submit() {
        this.loading = true;

        const requestInfosUpdated = this.request;
        const requestId = this.requestToEdit.id;

        this.$store.dispatch('Requests/editRequest', { requestInfosUpdated, requestId });
        this.$toasted.show("Request updated successfully", {
          icon : {
            name : 'done_outline',
            after : true
          },
          theme: "outline",
          position: "bottom-right",
          duration : 2000
        });

        this.hideEditRequestModal();
      }
    }
  }
</script>
