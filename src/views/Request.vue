<template>
  <div>
    <div v-if="status && request" class="mb-5 mb-lg-0" data-test="div-request">
      <v-icon
        class="ml-3 ml-lg-7 ml-xl-9 mt-md-16 mt-1"
        style="position: absolute; top: 0"
        @click="$router.replace({ name: 'Requests' })"
        size="40"
      >
        mdi-arrow-left-thin-circle-outline
      </v-icon>

      <v-container class="align-center mt-13 background-container">
        <div class="pa-6 pt-4">
          <v-row class="d-flex justify-space-between">
            <v-col class="mt-3">
              <span style="position: relative" class="display-1" data-test="request-subject">
                <strong>Subject :</strong> {{ request.subject }}
              </span>

              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-if="isUser && isOpen(request.status)"
                    @click="editRequestModal = true"
                    class="ml-3 mt-1"
                    color="indigo"
                    outlined
                    absolute
                    x-small
                    fab
                    v-bind="attrs"
                    v-on="on"
                    data-test="edit-request"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span> Edit </span>
              </v-tooltip>
            </v-col>

            <div class="mt-10 mt-md-0 ml-0 ml-md-9">
              Created by
              <v-card
                outlined
                class="mt-1"
                :width="$vuetify.breakpoint.xsOnly ? 255 : 300"
              >
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      :src="request.created_by.image_url"
                      alt="profile picture"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content style="width: 200px">
                    <v-list-item-title>
                      {{ request.created_by.name }} ({{
                        request.created_by.role.name
                      }})
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{ request.created_by.email }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </v-row>

          <divider></divider>

          <p style="font-size: 20px" class="text-wrap" data-test="request-description">
            <strong>Description : </strong> {{ request.description }}
          </p>
        </div>
      </v-container>

      <v-container class="background-container--no-color align-center mt-10">
        <v-layout row wrap>
          <v-flex xs12 sm12 lg4>
            <v-card class="mr-0 mr-lg-8">
              <v-card-title>
                Status

                <v-spacer></v-spacer>

                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="isHR"
                      rounded
                      color="grey lighten-3"
                      @click="changeStatusDialog = true"
                      v-bind="attrs"
                      v-on="on"
                      data-test="change-status-request"
                    >
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                  </template>
                  <span> Change status </span>
                </v-tooltip>

                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-if="isManager && isHRReviewed(request.status)"
                      rounded
                      color="green lighten-3"
                      dark
                      @click="completeRequestDialog = true"
                      v-bind="attrs"
                      v-on="on"
                      data-test="show-complete-request"
                    >
                      <v-icon> mdi-check </v-icon>
                    </v-btn>
                  </template>
                  <span> Complete </span>
                </v-tooltip>
              </v-card-title>

              <v-divider></v-divider>

              <Steps
                :current="request.status.id - 1"
                direction="vertical"
                class="ma-9 pb-5"
              >
                <Step
                  v-for="statusRow in status"
                  :key="statusRow.id"
                  :title="statusRow.name"
                  :content="
                    $vuetify.breakpoint.xsOnly ? '' : statusRow.description
                  "
                ></Step>
              </Steps>
            </v-card>
          </v-flex>

          <v-flex xs12 sm12 lg8 class="full-width">
            <v-card>
              <v-card-title> Logs </v-card-title>

              <v-divider></v-divider>

              <RequestLogs :logs="request.logs" />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <LoadingBar v-else message="Getting request info..."></LoadingBar>

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
      @hideCompleteRequestDialog="completeRequestDialog = false"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import EditRequest from '@/components/EditRequest';
import ChangeStatusRequestDialog from '@/components/ChangeStatusRequestDialog';
import CompleteRequestDialog from '@/components/CompleteRequestDialog';
import RequestLogs from '@/components/RequestLogs';
import LoadingBar from '@/components/LoadingBar';
import {isUser, isHR, isManager} from '@/services/UserService';
import {isOpen, isHRReviewed} from '@/services/RequestService';

export default {
  name: 'Request',
  components: {
    EditRequest,
    ChangeStatusRequestDialog,
    CompleteRequestDialog,
    RequestLogs,
    LoadingBar,
  },
  data() {
    return {
      isUser: isUser(),
      isHR: isHR(),
      isManager: isManager(),
      status: null,
      editRequest: false,
      requestToEdit: null,
      editRequestModal: false,
      completeRequestDialog: false,
      changeStatusDialog: false,
    };
  },
  methods: {
    isOpen,
    isHRReviewed,

    ...mapActions({
      setRequest: 'Requests/setRequest',
    }),
  },
  mounted() {
    this.setRequest(this.$route.params.id);

    this.$http.get('request/status').then((response) => {
      this.status = response.data.data;
    });
  },
  computed: {
    ...mapGetters('Requests', {
      request: 'request',
    }),
  },
};
</script>
