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
        <v-btn
            class="mt-6"
            text
            color="error"
            @click="hideRequestLogsSheet"
        >
          close
        </v-btn>

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
