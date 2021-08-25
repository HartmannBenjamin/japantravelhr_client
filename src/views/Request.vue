<template>
  <div>
    <div v-if="status !==null && request !== null" class="mb-5 mb-lg-0">
      <v-icon
          class="ml-3 ml-xl-9 mt-sm-16 mt-1"
          style="position:absolute; top:0"
          @click="$router.replace({name: 'Requests'})"
          size="40"
      >
        mdi-arrow-left-thin-circle-outline
      </v-icon>

      <v-container
          style="width: 85%;
          background-color: rgb(243,246,246);
          border-radius: 2px"
         class="align-center mt-13"
      >
        <div class="pa-6 pt-4">

          <v-row class="d-flex justify-space-between">
            <v-col class="mt-3">
              <span style="position: relative" class="display-1"><b>Subject :</b> {{ request.subject }}</span>
              <v-btn
                  v-if="isUser && request.status.name === 'Open'"
                  @click="editRequestModal = true"
                  class="ml-3 mt-1"
                  outlined
                  absolute
                  x-small
                  fab
                  color="indigo"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>

            <div class="mt-10 mt-md-0">
              Created by
              <v-card outlined class="mt-1" :width="$vuetify.breakpoint.xsOnly ? 255 : 300">
                <v-list-item>
                  <v-list-item-avatar>
                    <img :src="request.created_by.image_url" alt="profile picture">
                  </v-list-item-avatar>

                  <v-list-item-content style="width: 200px">
                    <v-list-item-title> {{ request.created_by.name }} ({{ request.created_by.role.name }}) </v-list-item-title>
                    <v-list-item-subtitle> {{ request.created_by.email }} </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>

            </div>
          </v-row>

          <divider></divider>

          <p style="font-size: 20px" class="text-wrap"><b>Description : </b> {{ request.description }}</p>
        </div>
      </v-container>

      <v-container style="width: 85%; border-radius: 2px" class="align-center mt-10">
        <v-layout row wrap>
          <v-flex xs12 sm12 lg4>
            <v-card class="mr-0 mr-lg-8">
              <v-card-title>
                Status

                <v-spacer></v-spacer>

                <v-btn
                    v-if="isHR && request.status.name !== 'Complete'"
                    rounded
                    color="grey lighten-3"
                    @click="changeStatusDialog = true"
                >
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>

                <v-btn
                    v-if="isManager && request.status.name === 'Hr Reviewed'"
                    rounded
                    color="green lighten-3"
                    dark
                    @click="completeRequestDialog = true"
                >
                  <v-icon> mdi-check </v-icon>
                </v-btn>
              </v-card-title>

              <v-divider></v-divider>

              <Steps :current="request.status.id - 1" direction="vertical" class="ma-9 pb-5">
                <Step v-for="statusRow in status"
                      :key="statusRow.id"
                      :title="statusRow.name"
                      :content="$vuetify.breakpoint.xsOnly ? '' :statusRow.description"
                ></Step>
              </Steps>
            </v-card>
          </v-flex>

          <v-flex xs12 sm12 lg8 class="full-width">
            <v-card>
              <v-card-title>
                Logs
              </v-card-title>

              <v-divider></v-divider>

              <RequestLogs :logs="request.logs"/>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-container v-else style="height: 400px;">
      <v-row
          class="fill-height"
          align-content="center"
          justify="center"
      >
        <v-col
            class="text-subtitle-1 text-center"
            cols="12"
        >
          Getting request info...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
              color="cyan lighten-4"
              indeterminate
              rounded
              height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>

    <EditRequest
        v-if="editRequestModal && isUser"
        :requestToEdit="request"
        fromRequestPage
        @hideEditRequestModal="editRequestModal = false"
    />

    <ChangeStatusRequestDialog
        v-if="changeStatusDialog && isHR"
        :requestToEdit="request"
        :status="status"
        fromRequestPage
        @hideChangeStatusRequestDialog="changeStatusDialog = false"
    />

    <CompleteRequestDialog
        v-if="completeRequestDialog && isManager"
        :requestToEdit="request"
        fromRequestPage
        @hideCompleteRequestDialog="completeRequestDialog = false;"
    />
  </div>
</template>

<script>
  import EditRequest from "@/components/EditRequest";
  import ChangeStatusRequestDialog from "@/components/ChangeStatusRequestDialog";
  import CompleteRequestDialog from "@/components/CompleteRequestDialog";
  import RequestLogs from "@/components/RequestLogs";
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Request',
    components: {
      EditRequest,
      ChangeStatusRequestDialog,
      CompleteRequestDialog,
      RequestLogs
    },
    methods: {
      ...mapActions({
        setRequest: 'Requests/setRequest'
      }),
    },
    mounted() {
      this.setRequest(this.$route.params.id);

      this.$http.get('request/status').then((response) => {
        this.status = response.data.data;
      })
    },
    computed: {
      ...mapGetters('Requests', {
        request: 'request',
      }),
    },
    data () {
      return {
        isUser: this.$auth.user().role.name ===  'User',
        isHR: this.$auth.user().role.name ===  'HR',
        isManager: this.$auth.user().role.name ===  'Manager',
        status: null,
        editRequest: false,
        requestToEdit: null,
        editRequestModal:false,
        completeRequestDialog: false,
        changeStatusDialog: false,
      }
    },
  }
</script>
