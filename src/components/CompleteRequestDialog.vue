<template>
  <v-dialog
      v-model="dialog"
      v-if="requestToEdit"
      max-width="600"
      @click:outside="hideCompleteRequestDialog"
  >
    <v-card>
      <v-card-title class="text-h5 pb-7">
        Do you want to complete this request ?
      </v-card-title>

      <v-card-text>
        <b> Subject: </b> {{ requestToEdit.subject }}
        <br>
        <b> Description: </b> {{ requestToEdit.description }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="green darken-1"
            text
            @click="hideCompleteRequestDialog"
        >
          No
        </v-btn>

        <v-btn
            color="green darken-1"
            text
            @click="submit()"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: 'CompleteRequestDialog',
    props: {
      requestToEdit: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        dialog: true,
        status: [],
      }
    },
    methods: {
      ...mapActions({
        updateRequestToComplete: 'Requests/updateRequestToComplete'
      }),

      hideCompleteRequestDialog() {
        this.$emit('hideCompleteRequestDialog');
      },

      submit() {
        this.updateRequestToComplete(this.requestToEdit.id);
        this.changeStatusDialog = false;
        this.completeRequestDialog = false;

        this.hideCompleteRequestDialog();

        this.$toasted.show("Request has been completed", {
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
