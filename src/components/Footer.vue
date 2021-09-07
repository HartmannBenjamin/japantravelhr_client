<template>
  <v-footer app inset color="cyan lighten-5" height="56">
    <v-col class="text-center"> JapanTravel : Test project © 2021 </v-col>

    <div class="postman-run-button"
         v-if="isChrome"
         data-postman-action="collection/fork"
         data-postman-var-1="17271595-002c31ce-1349-4f74-b428-9c3c91faf59d"
         data-postman-collection-url="entityId=17271595-002c31ce-1349-4f74-
           b428-9c3c91faf59d&entityType=collection&workspaceId=e75db560-c80b-43a7-a6b7-4c2636dea61e"
         data-postman-param="env%5BProd%20env%5D=W3sia2V5IjoiQVBJX1VSTCIsInZhbHVlIjoiYXB
           pLmJlbmphbWluLWhhcnRtYW5uLmZyIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJUT0tFTiIsInZhbHVlIjoiI
           iwiZW5hYmxlZCI6dHJ1ZX1d">
    </div>
  </v-footer>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return {
      isChrome: this.$browserDetect.meta.name === 'Chrome',
    };
  },
  mounted() {
    if (this.isChrome) {
      (function(p, o, s, t, m, a, n) {
        !p[s] && (p[s] = function() {
          // eslint-disable-next-line prefer-rest-params
          (p[t] || (p[t] = [])).push(arguments);
        });
        !o.getElementById(s+t) && o.getElementsByTagName('head')[0].appendChild((
          (n = o.createElement('script')),
          (n.id = s+t), (n.async = 1), (n.src = m), n
        ));
      }(window, document, '_pm', 'PostmanRunObject', 'https://run.pstmn.io/button.js'));
    }
  },
};

</script>
