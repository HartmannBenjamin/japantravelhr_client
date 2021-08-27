<template>
  <div>
    <v-container class="background-container align-center mt-10 mb-5">
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
            single-line
            hide-details
            outlined
            dense
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
            <tr
                @mouseover="mouseOn = row.item.id"
                @mouseout="mouseOn = null">
              <td
                  style="max-width: 200px; cursor: pointer"
                  @click="showRequest(row.item.id)"
              >
                <v-list-item>
                  <v-list-item-title>
                    <marquee-text
                        :duration="row.item.subject.length"
                        :paused="mouseOn !== row.item.id"
                    >
                      <b>{{ row.item.subject }}</b>
                    </marquee-text>
                    </v-list-item-title>
                </v-list-item>
              </td>
              <td
                  style="max-width: 300px; cursor: pointer"
                  @click="showRequest(row.item.id)"
              >
                <v-list-item>
                  <v-list-item-title>
                    <marquee-text
                        :duration="0.3 * row.item.description.length"
                        :paused="mouseOn !== row.item.id"
                    >
                      {{ row.item.description }}
                    </marquee-text>
                  </v-list-item-title>
                </v-list-item>
              </td>
              <td>
                <v-chip
                    v-if="isHR"
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
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        color="cyan lighten-3"
                        @click="showRequest(row.item.id)"
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span> View request </span>
                </v-tooltip>

                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        color="green"
                        @click="requestLogSheet = true; requestToEdit = row.item;"
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon> mdi-text-box-outline </v-icon>
                    </v-btn>
                  </template>
                  <span> Logs </span>
                </v-tooltip>

                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-if="isUser && isOpen(row.item.status)"
                        color="blue"
                        @click="requestToEdit = row.item; editRequestModal = true"
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>
                  <span> Edit </span>
                </v-tooltip>


                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        icon
                        v-if="isManager && isHRReviewed(row.item.status)"
                        color="blue"
                        @click="completeRequestDialog = true; requestToEdit = row.item;"
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                  </template>
                  <span> Complete </span>
                </v-tooltip>
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
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import MarqueeText from 'vue-marquee-text-component'
  import CreateRequest from "@/components/CreateRequest";
  import EditRequest from "@/components/EditRequest";
  import ChangeStatusRequestDialog from "@/components/ChangeStatusRequestDialog";
  import CompleteRequestDialog from "@/components/CompleteRequestDialog";
  import RequestLogsSheet from "@/components/RequestLogsSheet";
  import { isUser, isHR, isManager } from '@/services/UserService';
  import { isOpen, isHRReviewed } from '@/services/RequestService';

  export default {
    name: 'Requests',
    components: {
      CreateRequest,
      EditRequest,
      ChangeStatusRequestDialog,
      CompleteRequestDialog,
      RequestLogsSheet,
      MarqueeText
    },
    data () {
      return {
        isUser: isUser(),
        isHR: isHR(),
        isManager: isManager(),
        loading: this.requests !== null,
        mouseOn: null,
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
    methods: {
      isOpen, isHRReviewed,

      ...mapActions({
        setRequests: 'Requests/setRequests',
      }),

      showRequest(id) {
        this.$router.push({name: 'Request', params: {id: id} })
      },

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
  }
</script>
