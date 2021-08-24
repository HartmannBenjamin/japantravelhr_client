<template>
  <v-dialog
      v-model="dialog"
      v-if="requestToEdit"
      max-width="500"
      @click:outside="hideChangeStatusRequestDialog"
  >
    <v-card>
      <v-card-title class="text-h5 justify-center">
        Change request status
      </v-card-title>

      <v-card-actions class="justify-center">
          <span
              class="ma-3"
              v-for="statusRow in status"
              :key="statusRow.id"
          >
            <v-chip
                :small="$vuetify.breakpoint.xsOnly"
                :color="statusRow.color_code"
                @click="submit(statusRow)"
                v-if="statusRow.name !== 'Complete'"
                :disabled="requestToEdit.status.id === statusRow.id"
            >
              {{ statusRow.name }}
            </v-chip>
          </span>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: 'ChangeStatusRequestDialog',
    props: {
      requestToEdit: {
        type: Object,
        required: true,
      },
      status: {
        type: Array,
        required: true,
      },
      fromRequestPage: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialog: true,
      }
    },
    methods: {
      ...mapActions({
        updateStatusRequest: 'Requests/updateStatusRequest',
      }),

      hideChangeStatusRequestDialog() {
        this.$emit('hideChangeStatusRequestDialog');
      },

      submit(status) {
        if (status.name === 'Complete') {
          return;
        }

        const statusId = status.id;
        const requestId = this.requestToEdit.id;
        const fromRequestPage = this.fromRequestPage;

        this.updateStatusRequest({statusId, requestId, fromRequestPage});
        this.hideChangeStatusRequestDialog();

        this.$toasted.show("The status has been changed to: " + status.name, {
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
