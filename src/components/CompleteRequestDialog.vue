<template>
  <v-dialog
    v-model="dialog"
    v-if="requestToEdit"
    max-width="600"
    @click:outside="hideCompleteRequestDialog"
  >
    <v-card>
      <v-card-title class="text-h5 pb-4">
        Do you want to complete this request ?
      </v-card-title>

      <v-divider class="mb-10"></v-divider>

      <v-card-text>
        <p>
          <strong> Subject: </strong> {{ requestToEdit.subject }}
        </p>

        <div class="div-text-wrap" data-test="request-description">
          <strong>Description:</strong>
          {{ requestToEdit.description }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="hideCompleteRequestDialog">
          No
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="submit()"
          data-test="complete-request"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions} from 'vuex';
import {isHRReviewed} from '@/services/RequestService';

export default {
  name: 'CompleteRequestDialog',
  props: {
    requestToEdit: {
      type: Object,
      required: true,
    },
    fromRequestPage: {
      // Not from main requests page
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: true,
      status: [],
    };
  },
  methods: {
    ...mapActions({
      updateRequestToComplete: 'Requests/updateRequestToComplete',
    }),

    hideCompleteRequestDialog() {
      this.$emit('hideCompleteRequestDialog');
    },

    submit() {
      if (!isHRReviewed(this.requestToEdit.status)) {
        return;
      }

      const requestId = this.requestToEdit.id;
      const fromRequestPage = this.fromRequestPage;

      this.updateRequestToComplete({requestId, fromRequestPage});
      this.hideCompleteRequestDialog();
    },
  },
};
</script>
