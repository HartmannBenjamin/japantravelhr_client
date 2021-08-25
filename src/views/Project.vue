<template>
  <div>
    <pdf v-if="projectFile" :src="projectFile"></pdf>

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
          Getting project file...
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
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
    components: {
      pdf
    },
    data() {
      return {
        projectFile: null
      }
    },
    async mounted() {
      this.$http({
        url: 'projectFile',
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        this.projectFile =  window.URL.createObjectURL(new Blob([response.data]));
      });
    }
  }
</script>
