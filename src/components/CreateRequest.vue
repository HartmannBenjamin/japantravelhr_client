<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
      @click:outside="hideCreateRequestModal"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add a new Request</span>
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
                  label="Description"
                  @input="
                    validDescription =
                      getMaxLengthWord(request.description) < 25
                  "
                  :error-messages="validDescription ? '' : errorMessageWord"
                  required
                ></v-textarea>
              </v-col>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :disabled="!valid || !validDescription || !validSubject"
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
import message from '../config/Messages';
import {calculateLongestWord} from '@/services/Functions';

export default {
  name: 'CreateRequest',
  data() {
    return {
      dialog: true,
      valid: false,
      validDescription: true,
      validSubject: true,
      rules: rulesConfig,
      errorMessageWord: message.wordsTooLong,
      request: {
        subject: '',
        description: '',
      },
    };
  },
  methods: {
    getMaxLengthWord: calculateLongestWord,

    hideCreateRequestModal() {
      this.$emit('hideCreateRequestModal');
    },

    submit() {
      this.loading = true;
      this.$store.dispatch('Requests/addRequest', this.request);
      this.hideCreateRequestModal();
    },
  },
};
</script>
