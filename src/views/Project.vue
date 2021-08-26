<template>
  <div>
    <pdf v-if="projectFile" :src="projectFile"></pdf>
    <LoadingBar v-else message="Getting project file..."/>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import LoadingBar from "@/components/LoadingBar";

export default {
    components: {
      pdf,
      LoadingBar
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
