<template>
  <v-app>
    <v-container style="width: 85%; background-color: rgb(243,246,246); border-radius: 2px" class="align-center mt-10 mb-5">
      <v-row class="ma-3 mt-0 d-flex justify-space-between">
        <v-col>
          <h1> {{ isUser ? 'My Requests' : 'Users Requests'}} </h1>
        </v-col>

        <v-card outlined color="transparent" class="mt-4">
          <Button @click="createRequestModal = true" v-if="isUser">
            <v-icon class="pr-1"> mdi-plus </v-icon>
            Add new Request
          </Button>
          <Button @click="downloadPdf" v-else>
            <v-icon class="pr-1"> mdi-file-pdf </v-icon>
            Download PDF
          </Button>
        </v-card>
      </v-row>

      <v-divider></v-divider>

      <v-container class="pa-6">
        <v-text-field
            background-color="white"
            class="mb-4"
            v-model="search"
            append-icon="search"
            label="Search for a specific request"
            outlined
            dense
            single-line
            hide-details
        ></v-text-field>
        <v-data-table
            :headers="headers"
            :items="requests"
            :search="search"
            :sort-by.sync="sortBy"
            :sort-desc.sync="isDescending"
            :loading="loading"
            class="elevation-1"
        >
          <template v-slot:item="row">
            <tr>
              <td><b>{{ row.item.subject }}</b></td>
              <td>{{ row.item.description }}</td>
              <td>
                <v-chip
                    v-if="isHR && row.item.status.name !== 'Complete'"
                    :color="row.item.status.color_code"
                    @click="changeStatusDialog = true; requestToEdit = row.item"
                >
                  {{ row.item.status.name }}
                  <v-icon class="ml-2">mdi-pencil</v-icon>
                </v-chip>
                <v-chip :color="row.item.status.color_code" v-else>
                  {{ row.item.status.name }}
                </v-chip>
              </td>
              <td>
                <v-list-item-avatar size="27" class="mr-3">
                  <img :src="row.item.created_by.image_url" alt="profile picture">
                </v-list-item-avatar>
                {{ row.item.created_by.name }} ({{ row.item.created_by.email }})
              </td>
              <td>
                <v-chip small label>
                  {{ getDateRequest(row.item.updated_at) }}
                </v-chip>
              </td>
              <td>
                <v-btn
                    icon
                    color="purple lighten-2"
                    @click="$router.push({name: 'Request', params: {id: row.item.id} })"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
                <v-btn
                    icon
                    color="green"
                    @click="requestLogSheet = true; requestToEdit = row.item;"
                >
                  <v-icon> mdi-text-box-outline </v-icon>
                </v-btn>
                <v-btn
                    icon
                    v-if="isUser && row.item.status.name === 'Open'"
                    color="blue"
                    @click="requestToEdit = row.item; editRequestModal = true"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                    icon
                    v-if="isManager && row.item.status.name === 'Hr Reviewed'"
                    color="blue"
                    @click="completeRequestDialog = true; requestToEdit = row.item;"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </v-container>

    <CreateRequest
        v-if="createRequestModal && isUser"
        @hideCreateRequestModal="createRequestModal = !createRequestModal;"
    />

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

    <RequestLogsSheet
        v-if="requestToEdit && requestLogSheet"
        :request="requestToEdit"
        @hideRequestLogsSheet="requestLogSheet = false; requestToEdit = null"
    />
  </v-app>
</template>

<script>
  import CreateRequest from "@/components/CreateRequest";
  import EditRequest from "@/components/EditRequest";
  import ChangeStatusRequestDialog from "@/components/ChangeStatusRequestDialog";
  import CompleteRequestDialog from "@/components/CompleteRequestDialog";
  import RequestLogsSheet from "@/components/RequestLogsSheet";
  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';

  export default {
    name: 'Requests',
    components: {
      CreateRequest,
      EditRequest,
      ChangeStatusRequestDialog,
      CompleteRequestDialog,
      RequestLogsSheet
    },
    methods: {
      ...mapActions({
        setRequests: 'Requests/setRequests',
      }),

      getDateRequest(date) {
        if(date === null) {
          return 'None'
        }
        return moment(date).utc().format('MMMM Do YYYY, h:mm a')
      },

      downloadPdf() {
        this.$http.get(`request/pdf`, {responseType: 'blob'})
            .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');

              link.href = url;
              link.setAttribute('download', new Date().toLocaleDateString() + '_requests.pdf');
              document.body.appendChild(link);
              link.click();
            })
            .catch(error => {
              console.log(error);
            })
      }
    },
    mounted() {
      this.setRequests().then(() => {
        this.loading = false;
      });

      this.$http.get('request/status').then((response) => {
        this.status = response.data.data;
      })
    },
    computed: {
      ...mapGetters('Requests', {
        requests: 'requests',
      }),
    },
    data () {
      return {
        isUser: this.$auth.user().role.name ===  'User',
        isHR: this.$auth.user().role.name ===  'HR',
        isManager: this.$auth.user().role.name ===  'Manager',
        loading: this.requests !== null,
        requestToEdit: null,
        createRequestModal: false,
        editRequestModal:false,
        completeRequestDialog: false,
        requestLogSheet: false,
        changeStatusDialog: false,
        status: [],
        sortBy: 'updated_at',
        isDescending: true,
        search: '',
        headers: [
          { text: 'Subject', value: 'subject' },
          { text: 'Description', value: 'description' },
          { text: 'Status', value: 'status.id' },
          { text: 'Created By', value: 'created_by.name' },
          { text: 'Date', value: 'updated_at' },
          { text: 'Actions', sortable: false},
        ],
      }
    },
  }
</script>
