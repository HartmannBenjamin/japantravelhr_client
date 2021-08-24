<template>
  <v-app>
    <div v-if="status !==null && request !== null">
        <v-icon
            class="ml-3 ml-xl-9 mt-sm-9 mt-3"
            style="position:absolute;"
            @click="$router.replace({name: 'Requests'})"
            size="40"
        >
          mdi-arrow-left-thin-circle-outline
        </v-icon>
      <v-container
          style="width: 85%;
          background-color: rgb(243,246,246);
          border-radius: 2px"
         class="align-center mt-sm-16 mt-md-9 mt-16">
        <div class="pa-6">
          <h1 class="display-1 mt-2"><b>Subject :</b> {{ request.subject }}</h1>

          <divider></divider>

          <p style="font-size: 20px"><b>Description : </b> {{ request.description }}</p>
        </div>
      </v-container>
      <v-container style="width: 85%; border-radius: 2px" class="align-center mt-10">
        <v-row>
          <v-col class="col-3">
            <Steps :current="request.status.id - 1" direction="vertical">
              <Step v-for="statusRow in status"
                    :key="statusRow.id"
                    :title="statusRow.name"
                    :content="$vuetify.breakpoint.xsOnly ? '' :statusRow.description"
              ></Step>
            </Steps>
          </v-col>
          <v-col class="col-6">
            <RequestLogs :logs="request.logs"/>
          </v-col>
          <v-col class="col-3">
            <v-container>
             <v-list-item class="px-2">
              <v-list-item-avatar>
                <img :src="$auth.user().image_url" alt="profile picture">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title> {{ $auth.user().name }} ({{ $auth.user().role.name }}) </v-list-item-title>
                <v-list-item-subtitle> {{ $auth.user().email }} </v-list-item-subtitle>
              </v-list-item-content>
              </v-list-item>
            </v-container>
          </v-col>
        </v-row>

        <EditRequest
            v-if="editRequestModal && requestToEdit !== null && isUser"
            :requestToEdit="requestToEdit"
            @hideEditRequestModal="editRequestModal = false; requestToEdit = null"
        />

        <ChangeStatusRequestDialog
            v-if="changeStatusDialog && requestToEdit !== null && isHR"
            :requestToEdit="requestToEdit"
            :status="status"
            @hideChangeStatusRequestDialog="changeStatusDialog = false; requestToEdit = null"
        />

        <CompleteRequestDialog
            v-if="completeRequestDialog && requestToEdit !== null && isManager"
            :requestToEdit="requestToEdit"
            @hideCompleteRequestDialog="completeRequestDialog = false; requestToEdit = null"
        />
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
              color="deep-purple accent-4"
              indeterminate
              rounded
              height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
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
