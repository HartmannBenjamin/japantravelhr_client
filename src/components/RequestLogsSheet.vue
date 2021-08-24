<template>
  <v-col>
    <v-bottom-sheet
        v-model="sheet"
        inset
        @click:outside="hideRequestLogsSheet"
    >
      <v-sheet
          class="text-center"
          height="361px"
      >
        <p class="display-1 pt-6 pb-2"> Request Logs </p>

        <v-card
            max-width="1100"
            class="mx-auto mt-4"
        >
          <RequestLogs :logs="request.logs"/>
        </v-card>
      </v-sheet>
    </v-bottom-sheet>
  </v-col>
</template>

<script>
  import RequestLogs from "@/components/RequestLogs";

  export default {
    components: {
      RequestLogs
    },
    props: {
      request: {
        type: Object,
        required: true
      }
    },
    methods: {
      hideRequestLogsSheet() {
        this.$emit('hideRequestLogsSheet');
      }
    },
    data() {
      return {
        sheet: true
      }
    }
  }
</script>
