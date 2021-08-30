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

        <v-divider class="mt-1"></v-divider>

        <v-card-text class="pb-0">
          <v-container>
            <v-form v-model="valid" onSubmit="return false;">
              <v-col cols="12">
                <v-text-field
                    v-model="request.subject"
                    :rules="rules.subjectRules"
                    @input="validSubject = getMaxLengthWord(request.subject) < 25"
                    :error-messages="validSubject ? '' : errorMessageWord"
                    label="Subject"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    v-model="request.description"
                    :rules="rules.descriptionRules"
                    @input="validDescription = getMaxLengthWord(request.description) < 25"
                    :error-messages="validDescription ? '' : errorMessageWord"
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
              :disabled="!valid || !validDescription|| !validSubject"
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
import rulesConfig from '../config/FormRules';
import {calculateLongestWord} from '@/services/Functions';

export default {
  name: 'EditRequest',
  props: {
    requestToEdit: {
      type: Object,
      required: true,
    },
    fromRequestPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: true,
      valid: false,
      validSubject: true,
      validDescription: true,
      rules: rulesConfig,
      errorMessageWord: 'All words need to be less than 25 characters.',
      request: {
        subject: this.requestToEdit.subject,
        description: this.requestToEdit.description,
      },
    };
  },
  methods: {
    getMaxLengthWord: calculateLongestWord,

    hideEditRequestModal() {
      this.$emit('hideEditRequestModal');
    },

    submit() {
      this.loading = true;

      const requestInfosUpdated = this.request;
      const requestId = this.requestToEdit.id;
      const fromRequestPage = this.fromRequestPage;

      this.$store.dispatch('Requests/editRequest', {requestInfosUpdated, requestId, fromRequestPage});

      this.$toasted.show('Request updated successfully', {
        icon: {
          name: 'done_outline',
          after: true,
        },
        theme: 'outline',
        position: 'bottom-right',
        duration: 2000,
      });

      this.hideEditRequestModal();
    },
  },
};
</script>
